import * as express from "express";
import {router_base} from "../../app_modules/components/router_base";
import {tasks_service} from "./tasks_service";
export class tasks_router extends router_base {
    public name = "tasks";
    public service:tasks_service;

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        let pagination = this.service.pagination();
        let conditions = this.service.conditions( req );
        let tasks = pagination.find( conditions , req.query);
        tasks.then( (result : {rows : any, count :number,pagination:any}) => {
            // for rows
            this.setData({tasks:result.rows});
            // for pagination
            this.setData({page:result.pagination});
            this.render(req,res,"index");
        }).catch((error) => {               
            this.setData({tasks: {} });
            this.render(req,res,"index");
        })
    }

    private add = (req:express.Request, res:express.Response, next:express.NextFunction) => {
        //スキーマを取得してセットする。
        this.setData({"task" : {} } );
        this.render( req , res , "add");
    }
    
    private view = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            this.setData({"task" : result.dataValues});
            this.render( req , res , "view");
        })
    }

    private edit = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            this.setData({"task" : result.dataValues});
            this.render( req , res , "edit");
        })
    }
    
    private delete = (req:express.Request,res:express.Response) => {
        let model = this.model;
        model.findById( req.params.id ).then((result) => {
            console.log(result);
            if(result){
                result.destroy().then( () => {
                    res.send(200);
                });
                return;
            }
            res.send(500);
        })
    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {
        let entity = this.model.build(req.body);
        entity.save().then( () => {
            res.redirect("/tasks");
        }).catch((err) => {
            this.add(req,res,next);
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        console.log(req.params.id); 
        let model = this.model;
        model.findById( req.params.id ).then((task) => {
            task.update(req.body).then( (result) => {
                res.redirect("/tasks");
            }).catch((err) => {
                this.edit(req,res,next);
            });
        })
    }

    protected beforeRender = (req:express.Request,res:express.Response) => {
       this.loadHelper("form");
       this.loadHelper("pagination");
       this.loadHelper("crud_support");
       this.csrfReady(req);
       return new Promise((resolve,reject) => {
            resolve(true);
       })
   }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/", csrfProtection , this.search);
        router.get("/page/:page", csrfProtection , this.search);
        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/", parseForm , csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.put("/:id",csrfProtection,this.update);
        router.delete("/:id", csrfProtection , this.delete);
        router.post("/:id/delete", csrfProtection , this.delete);
        return router;
    }

}
