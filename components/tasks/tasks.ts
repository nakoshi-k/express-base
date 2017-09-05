import {router_base} from "../router_base";

export class tasks extends router_base {
    public name = "tasks";

    
    private search = (req,res,next) => {
        this.setData({"title":"search"});
        this.render(req, res,"index"); 
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
        let entity = this.models.tasks.build(req.body);
        entity.save().then( () => {
            res.redirect("/tasks");
        }).catch(() => {
            this.add(req,res,next);
        })
    }

    private update = (req,res,next) => {

    }

    protected beforeRender = (req,res) => {
       this.loadHelper("form");
       this.csrfReady(req);
    }

    public bind = () => {
        let router = this.router;
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/", csrfProtection , this.search);
        router.get("/add", csrfProtection , this.add);
        router.get("/:id", csrfProtection , this.view);
        router.post("/", parseForm , csrfProtection , this.insert);
        router.get("/:id/edit", csrfProtection , this.edit);
        router.delete("/:id", csrfProtection , this.delete);
        router.put("/:id",csrfProtection,this.update);
    }

}

export let router = new tasks().create();