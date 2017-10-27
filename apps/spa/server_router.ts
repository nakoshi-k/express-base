import * as express from "express"
import { router as core_router,routing_map,request,response,next} from "../apps_router"
import {service as apps_service} from "../apps_service"
import { system } from "../../base/core"
import * as path from "path"

import * as Vue from "vue"
import * as Router from "vue-router"
Vue.use(Router)

import * as VueRender from "vue-server-renderer"
import * as Request from "request"
import * as serialize from "serialize-javascript"
import {feeds as resources_feeds} from "../resources/feeds"
import {default as BundleServer}  from "./server/bundle-server"

interface ssr_response {
    html : string,
    title : string,
    meta : string,
    description : string
}

export class router extends core_router{
    public name = "spa"
    public parent = {}
    public mount = "/"

    constructor(){
        super();
    }

    protected _mapping :  { [propName: string]: routing_map }= {
        idx : { type : "get", mount : "/*", component : "view" , middle_ware : null } ,
    }

    private app : (context) => Promise<Vue> = (context) => {
        let server : any = BundleServer
        let app = (resolve,reject) => {
            server( context ).then(
                ( app : Vue )=> resolve(app)
            ).catch(
                e => reject(e)
            ) 
        }
        return new Promise(app);
    }

    private appRender : (app) => Promise<ssr_response> = (app:Vue) => {
        const renderer = VueRender.createRenderer()
        let state =`<script>window.__INITIAL_STATE__=${ serialize(app.$store.state, { isJSON: true }) }</script>` 
        let appRender = (resolve,reject) => {
            renderer.renderToString( app , (err:any,html)  => {
                if (err) {
                    if (err.code === 404) {
                      reject(404)
                    } 
                   reject(500)
                   return
                }
                let response = {
                    html : html + state,
                    state : state,
                    title : "title",
                    meta : "",
                    description : ""
                }
                resolve( response )
          })
        }
        return new Promise(appRender);
    }

    async ssr(context){
        let app = await this.app(context)
        let render = await this.appRender(app);
        return render;
    }

    private view = (req : request,res: response, next :next) => {

        let feeds = new resources_feeds();
        feeds.init(req,res);

        const context = {
            url: req.url,
            feeds : feeds
        }

        let dir = path.resolve([ __dirname , ".." , "views"].join(path.sep) )
        this.renderer.views = {common : dir , typical : dir};

        let rend = this.renderer.create(res);
        this.ssr(context).then(ssrr => {
            rend.set_vars( {
                title : ssrr.title,
                meta : ssrr.meta,
                description: ssrr.description,
                ssr : ssrr.html
            })
            rend.render("view")
        }).catch(err => {
            if ( err.code == 404){
                rend.status(404)
            }
            if(res.app.get('env') === 'development') {
                rend.set_vars({
                    code : err.code,
                    message: err.message ,
                    error: err
                });
                rend.render('error');
                return;
            }
            rend.set_vars({
                message: err.code + " " + err.message ,
                error: null
            });
            rend.render('error');
        })
    }

}