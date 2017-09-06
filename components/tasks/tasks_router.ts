import * as express from "express";
import {router_base} from "../router_base";

export class tasks_router extends router_base {
    public name = "tasks";

    private search = (req,res,next) => {

        let tasks = this.service.pagination({
            limit : 10
        });

        tasks.then( (result : {rows : any, count :number,page:number}) => {
            this.setData({tasks:result.rows});
            this.setData({pagination:result.page});
            this.render(req,res,"index");
        }).catch((error) => {               
            this.render(req,res,"index");
        })

    }
    

    private add = (req,res,next) => {
        //スキーマを取得してセットする。
        this.setData({"task" : { title : "title" , priod : "2016-10-18" } });
        this.render( req , res , "add");
    }
    
    private view = (req,res,next) => {
        this.setData({"task" : { title : "title" , priod : "2016-10-18" } });
        this.render( req , res , "view");
    }

    private edit = (req,res,next) => {

    }
    
    private delete = (req,res) => {

    }

    private insert = (req,res,next) => {

        let entity = this.model.build(req.body);
        entity.save().then( () => {
            res.redirect("/tasks");
        }).catch((e) => {
            console.log(e);
            this.add(req,res,next);
        })
    }

    private update = (req,res,next) => {

    }

    protected beforeRender = (req,res) => {
       this.loadHelper("form");
       this.csrfReady(req);
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/", csrfProtection , this.search);
        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/", parseForm , csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.delete("/:id", csrfProtection , this.delete);
        router.put("/:id",csrfProtection,this.update);
        return router;
    }

}
