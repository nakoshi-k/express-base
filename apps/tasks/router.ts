import * as express from "express";
import {router as app_router} from "../router";
import {service} from "./service";
import * as helpers  from "../../base/helper";
import {input_error} from "../../base/core";
import * as Vue from "vue";
import * as Router from "vue-router";
import * as Request from "request";

Vue.use(Router);

import * as VueRender from "vue-server-renderer";
import {default as BundleServer}  from "./bundle-server";

export class router extends app_router {
    public name = "tasks";
    public service:service;
    
    constructor(){
        super();
        this.service = new service(this.name);
        return this.create();
    }
    
    protected beforeRender = (req,res) => {
        this.helper("form" ,new helpers.form());
        this.helper("pagination" , new helpers.pagination() );
        this.csrfReady(req);
    }

    private ssr(context){
        const renderer = VueRender.createRenderer();
        let server : any = BundleServer;
        let ssr = (resolve,reject) => {
            server( context ).then( (app : Vue) => {
                renderer.renderToString( app , (err:any,html)  => {
                    if (err) {
                        if (err.code === 404) {
                          reject(404);
                        } else {
                          reject(500);
                        }
                    }
                    resolve(html);
              });
            })
        }
        return new Promise(ssr);
    }

    private vue = (req : express.Request,res: express.Response, next : express.NextFunction) => {

        const context = {
            url: `/${this.name}${req.url}`,
            serverOptions : {
                host : req.protocol + '://' + req.headers.host ,
                entities : "tasks",
                entity : "task",
                request : Request
            }
        };

        this.ssr(context).then(ssr => {
            this.setData( {ssr : ssr} );
            this.render( req , res ,"vue");
        }).catch(err => {
            console.log(err);
            if( err === 404 ){
                res.send(404);
            }
            res.send(500);
        })
    }

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {

        const Vue = require('vue')
        const app = new Vue({
          template: `<div>Hello World</div>`
        })
        // ステップ 2: レンダラを作成
        const renderer = require('vue-server-renderer').createRenderer()
        // ステップ 3: Vue インスタンスを HTML に描画
        renderer.renderToString(app, (err, html) => {
          if (err) throw err
          console.log(html)
          // => <div data-server-rendered="true">hello world</div>
        })

        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let entities = pagination.find( conditions , req.query);
        let data = {};
        
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows;
            data["page"] = result.pagination;
<<<<<<< HEAD
            if(this.isXhr(req)){
                res.status(201);
                res.json(data);
                return;
            }
            // for rows
            this.setData(data);
            this.render(req,res,"vue");
        }).catch((error) => { 
            data[this.entities_name] = {};
            if(this.isXhr(req)){
                res.status(400);
                res.json(data);
                return;
            }
            this.setData(data);
            this.render(req,res,"vue");
        })
    }

    private add = (req:express.Request, res:express.Response, next:express.NextFunction) => {
        console.log(req.body);
        //スキーマを取得してセットする。
        let data = {};
        data[ this.entity_name  ] = {};
        if(req.body){
            data[ this.entity_name  ] = req.body;
        }
        this.setData(data);
        this.render( req , res , "vue");
    }
    
    private view = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(!result){
                throw Error;
            }
            if(this.isXhr(req)){
                res.status(201);
                res.json(result);
                return;
            }
            let data = {};
            data[this.entity_name] = result.dataValues; 
            this.setData(data);
            this.render( req , res , "vue");
        }).catch((res) => {
            if(this.isXhr(req)){
                res.status(401);
                return;
            }
            res.redirect(`/${this.entities_name}`);
=======
            res.status(201);
            res.json(data);
        }).catch((error) => { 
            data[this.entities_name] = {};
            res.status(400);
            res.json(data);
>>>>>>> c81a062cfb8d0dd5e167759476a7610e0dddcd2c
        })
        
    }

<<<<<<< HEAD
    private edit = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(!result){
                res.redirect( `/${this.entities_name}` );
            }
            let data = {};
            data[this.entity_name] = result.dataValues;
            this.setData(data);
            this.render( req , res , "vue");
        })
    }
=======
>>>>>>> c81a062cfb8d0dd5e167759476a7610e0dddcd2c
    
    private delete = (req:express.Request,res:express.Response) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(result){
                result.destroy().then( () => {
                    res.sendStatus(204);
                });
            }
            res.sendStatus(500);
        })
    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {
        let entity = this.model.build(req.body);
        entity.save().then( (result) => {
            res.status(201);
            res.json(entity.dataValues);
        }).catch((err) => {
            req.body.errors = this.service.validationError(err);
            res.status(400);
            res.json(req.body.errors);
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((entity) => {
            entity.update(req.body).then( (result) => {
                res.status(201);
                res.json(result);
            }).catch((err) => {
                res.status(400);
                res.json(err);
            });
        }).catch((err) => {
            res.status(400);
            res.json(err);
        })
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection;
        router.get("/page/:page", csrfProtection , this.search);
        router.get("/*", csrfProtection , this.vue);
        router.post("/",  csrfProtection , this.insert);
        router.put("/:id",csrfProtection,this.update);
        router.delete("/:id", csrfProtection , this.delete);
        return router;
    }

}
