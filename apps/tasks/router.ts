import * as express from "express";
import {router as app_router} from "../router";
import {service} from "./service";
import * as helpers  from "../../base/helper";
import {input_error} from "../../base/core";
import * as Vue from "vue";
import * as Router from "vue-router";
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

    private vue = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        const context = { url: req.url };
        const renderer = VueRender.createRenderer();
        let server : any = BundleServer;
        server( context ).then( (app : Vue) => {
            renderer.renderToString( app , (err:any,html)  => {
                console.log(err);
                if (err) {
                    if (err.code === 404) {
                      res.status(404).end('Page not found')
                    } else {
                      res.status(500).end('Internal Server Error')
                    }
                } 
                res.end(html);
          });
        })
    }

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {

        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let entities = pagination.find( conditions , req.query);
        let data = {};
        
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows;
            data["page"] = result.pagination;
            res.status(201);
            res.json(data);
        }).catch((error) => { 
            data[this.entities_name] = {};
            res.status(400);
            res.json(data);
        })
        
    }

    
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
        router.get("/*", csrfProtection , this.vue);
        router.post("/",  csrfProtection , this.insert);
        router.put("/:id",csrfProtection,this.update);
        router.delete("/:id", csrfProtection , this.delete);
        return router;
    }

}
