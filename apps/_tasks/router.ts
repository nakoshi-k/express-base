import * as express from "express";
import {router as app_router} from "../router";
import {service} from "./service";
import * as helpers  from "../../base/helper";
import {input_error} from "../../base/core";

import * as Vue from "vue";
import * as VueRouter from "vue-router";
import * as VueRender from "vue-server-renderer";
Vue.use(VueRouter);
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


    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {

        const vueserver = require("../public/tasks/server.js");
        
        console.log(vueserver);

        let router = new VueRouter({
            mode:"history",
            routes:vueserver.routes
        });

        const app = new Vue({
            router,
            template:"<tasks-main></tasks-main>",
            components : {"tasks-main":vueserver.tasks}
          });

        const renderer = require('vue-server-renderer').createRenderer()

        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let entities = pagination.find( conditions , req.query);
        let data = {};
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows;
            data["page"] = result.pagination;

            renderer.renderToString(app, (err, html) => {
                if (err) throw err
                if(this.isXhr(req)){
                    res.status(201);
                    res.json(data);
                    return;
                }
                data["html"] = html;
                // for rows
                this.setData(data);
                this.render(req,res,"vue");
            })


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
        })
    }

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
    
    private delete = (req:express.Request,res:express.Response) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(result){
                result.destroy().then( () => {
                    res.sendStatus(204);
                });
                return;
            }
            res.sendStatus(500);
        })
    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {
        let entity = this.model.build(req.body);
        entity.save().then( (result) => {
            if(this.isXhr(req)){
                res.status(201);
                res.json(entity.dataValues);
                return;
            }
            res.redirect(`/${this.entities_name}`);
        }).catch((err) => {
            req.body.errors = this.service.validationError(err);
            if(this.isXhr(req)){
                res.status(400);
                res.json(req.body.errors);
                return;
            }
            this.add(req,res,next);
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((entity) => {
            entity.update(req.body).then( (result) => {
              if(this.isXhr(req)){
                res.status(201);
                res.json(result);
                return;
              }
              res.redirect(`/${this.entities_name}`);
            }).catch((err) => {
              if(this.isXhr(req)){
                res.status(400);
                res.json(err);
                return;
              }
              this.edit(req,res,next);
            });
        }).catch((err) => {
            if(this.isXhr(req)){
                res.status(400);
                res.json(err);
                return;
              }
        })
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection;
        router.get("/", csrfProtection , this.search);
        router.get("/page/:page", csrfProtection , this.search);
        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/",  csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.put("/:id",csrfProtection,this.update);
        router.delete("/:id", csrfProtection , this.delete);
        return router;
    }

}
