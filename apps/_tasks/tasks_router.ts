import * as express from "express";
import {router} from "../router";
import {tasks_service} from "./tasks_service";
import * as helpers  from "../../base/helper";
import {input_error} from "../../base/core"
import * as bodyParser from "body-parser";

export class tasks_router extends router {
    public name = "tasks";
    public service:tasks_service;
    
    constructor(){
        super();
        this.service = new tasks_service(this.name);
    }
    
    protected beforeRender = (req,res) => {
        this.helper("form" ,new helpers.form());
        this.helper("pagination" , new helpers.pagination() );
        this.csrfReady(req);
    }


    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let tasks = pagination.find( conditions , req.query);
        tasks.then( (result : {rows : any, count :number,pagination:any}) => {
            // for rows
            this.setData({
                tasks:result.rows,
                page:result.pagination
            });
            this.render(req,res,"index");
        }).catch((error) => {               
            this.setData({tasks: {} });
            this.render(req,res,"index");
        })
    }

    private add = (req:express.Request, res:express.Response, next:express.NextFunction) => {
        console.log(req.body);
        //スキーマを取得してセットする。
        this.setData({"task" : this.model.schema } );
        if(req.body){
            this.setData({"task" : req.body });
        }
        this.render( req , res , "add");
    }
    
    private view = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(!result){
                res.redirect("/tasks");
            }
            this.setData({"task" : result.dataValues});
            this.render( req , res , "view");
        })
    }

    private edit = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            if(!result){
                res.redirect("/tasks");
            }
            this.setData({"task" : result.dataValues});
            this.render( req , res , "edit");
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
        console.log(req.body);
        let entity = this.model.build(req.body);
        entity.save().then( (res) => {
            console.log(res);
            if(this.isXhr(req)){
                res.status(201);
                res.json(res.dataValues);
                return;
            }
            res.redirect("/tasks");
        }).catch((err) => {
            console.log(err);
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
        console.log(req.body)
        let model = this.model;
        model.findById( req.params.id ).then((task) => {
            task.update(req.body).then( (result) => {
              if(this.isXhr(req)){
                res.status(201);
                res.json(result);
                return;
              }
              res.redirect("/tasks");
            }).catch((err) => {
                console.log("ww")
              if(this.isXhr(req)){
                req.body.errors = this.service.validationError(err);
                res.status(400);
                res.json(req.body);
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
        router.use(bodyParser.urlencoded({extended : false}))
        router.get("/", csrfProtection , this.search);
        router.get("/page/:page", csrfProtection , this.search);
        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/", csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.put("/:id",csrfProtection,this.update);
        router.delete("/:id", csrfProtection , this.delete);
        return router;
    }

}
