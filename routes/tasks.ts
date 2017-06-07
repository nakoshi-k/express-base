import {router_base} from "./router_base";
class tasks extends router_base {
    public name = "tasks";

    private search = (req,res,next) => {
        this.render(res,"index",{"title":"tanaka"}); 
    }
    
    private add = (req,res,next) => {
        //dbからスキーマを取得してセットする。
        this.setData({"task" : { "title" : "title" }})

        if( ! this.isPost(req) ) {
            this.setData({"task" : req.body } );            
        }

        this.csrf(req);
        this.render( res , "add");
    }

    private edit = (req,res,next) => {

    }
    
    private test = (req,res,next) => {
        this.send(res,'data is being processed');
    }
    
    private delete = (req,res,next) => {

    }

    public bind = () => {
        let router = this.router;
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/",this.search);
        
        router.get("/add", csrfProtection , this.add);
        router.post("/add", parseForm , csrfProtection , this.add);

    }

}
module.exports  = new tasks().create();