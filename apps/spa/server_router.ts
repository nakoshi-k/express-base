import * as express from "express"
import { router as core_router} from "../apps_router";
import {service as apps_service} from "../apps_service"
import { system } from "../../base/core";
import * as path from "path";

import * as Vue from "vue"
import * as Router from "vue-router"
Vue.use(Router)

import * as VueRender from "vue-server-renderer"
import * as Request from "request"
import * as serialize from "serialize-javascript"
import {feeds as resources_feeds} from "../resources/feeds"
import {default as BundleServer}  from "./bundle-server"

export class router extends core_router{
    public name = "spa"
    public parent = {}
    public mount = "/"

    constructor(mount){
        super(mount)
        this.mount = mount
        return this.create()
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

    private appRender = (app:Vue) => {
        const renderer = VueRender.createRenderer()
        let stateTag =`<script>window.__INITIAL_STATE__=${ serialize(app.$store.state, { isJSON: true }) }</script>` 
        let appRender = (resolve,reject) => {
            renderer.renderToString( app , (err:any,html)  => {
                if (err) {
                    if (err.code === 404) {
                      reject(404)
                    } 
                   reject(500)
                   return
                }
                resolve( html + stateTag)
          })
        }
        return new Promise(appRender);
    }

    async ssr(context){
        let app = await this.app(context)
        let render = await this.appRender(app);
        return render;
    }

    private view = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        const context = {
            url: req.url,
            feeds : new resources_feeds()
        }
        this.ssr(context).then(ssr => {
            this.setData( {ssr : ssr} )
            let d = path.resolve( __dirname + path.sep + ".." + path.sep + "views"  )
            this.render( req , res , d +  path.sep + "view")
        }).catch(err => {
            if ( err.code == 404){
                res.status(404)
            }
            res.render('error', {
                message: err.code,
                error: {}
            })
        })
    }

    protected beforeRender = (req,res) => {
        this.csrfReady(req)
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection
        let auth = this.isAuthenticated;
        let map = [ csrfProtection ]
        router.get("*", ...map , this.view )
        return router
    }
    

}