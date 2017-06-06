import {router_base} from "./router_base";
class tasks extends router_base {
    public name = "tasks";

    private search = (req,res,next) => {
        this.render(res,"index",{"title":"tanaka"}); 
    }
    
    private entry = (req,res,next) => {
        this.csfr(req);
        this.render(res,"entry");
    }

    protected bind = () => {
        let router = this.router;
        router.get("/",this.search);
        router.get("/entry",this.entry);
        router.post("/entry",this.entry);
    }

}
module.exports  = new tasks().create();