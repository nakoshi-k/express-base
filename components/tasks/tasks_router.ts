import * as express from "express";
import {router_base} from "../router_base";
import {tasks_service} from "./tasks_service";
export class tasks_router extends router_base {
    public name = "tasks";
    public service:tasks_service;

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        

        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let tasks = pagination.find(conditions);
        
        tasks.then( (result : {rows : any, count :number,pagination:any}) => {
            // fir riw
            this.setData({tasks:result.rows});
            // for pagination
            this.setData({page:result.pagination});

            this.render(req,res,"index");
        }).catch((error) => {               
            this.render(req,res,"index");
        })
    }

    private add = (req:express.Request, res:express.Response, next:express.NextFunction) => {
        //スキーマを取得してセットする。
        this.setData({"task" : { title : "title" , priod : "2016-10-18" } });
        this.render( req , res , "add");
    }
    
    private view = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        this.setData({"task" : { title : "title" , priod : "2016-10-18" } });
        this.render( req , res , "view");
    }

    private edit = (req:express.Request,res:express.Response,next:express.NextFunction) => {

    }
    
    private delete = (req:express.Request,res:express.Response) => {

    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {
        let entity = this.model.build(req.body);
        entity.save().then( () => {
            res.redirect("/tasks");
        }).catch((e) => {
            console.log(e);
            this.add(req,res,next);
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {

    }

    protected beforeRender = (req:express.Request,res:express.Response) => {
       this.loadHelper("form");
       this.loadHelper("pagination");
       this.csrfReady(req);
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/", csrfProtection , this.search);
        router.get("/page", csrfProtection , this.search);
        router.get("/page/:page", csrfProtection , this.search);

        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/", parseForm , csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.delete("/:id", csrfProtection , this.delete);
        router.put("/:id",csrfProtection,this.update);
        return router;
    }

}
