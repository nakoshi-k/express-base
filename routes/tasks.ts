import {router_base} from "./router_base";
class tasks extends router_base {
    public name = "tasks";

    private search = (req,res,next) => {
        this.setData({"title":"search"});
        this.render(req, res,"index"); 
    }
    
    private add = (req,res,next) => {
        //スキーマを取得してセットする。
        this.setData({"task" : { title : "title" , priod : "2016-10-18" } });
        
        if( this.isPost(req) ) {
            this.setData( {"task" : req.body} );            
        }
        
        this.render( req , res , "add");
    }

    private edit = (req,res,next) => {

    }
    
    private test = (req,res,next) => {
        this.send(res,'data is being processed');
    }
    
    private delete = (req,res,next) => {

    }

    protected beforeRender = (req,res) => {
       this.loadHelper("form");
       this.csrfReady(req);
    }

    public bind = () => {
        let router = this.router;
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/",csrfProtection,this.search);
        router.get("/add", csrfProtection , this.add);
        router.post("/add", parseForm , csrfProtection , this.add);
    }

}
module.exports  = new tasks().create();