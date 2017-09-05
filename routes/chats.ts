import {router_base} from "./router_base";
export class chats extends router_base {
    name = "chats";

    index = (req,res,next) => {
        this.render(req,res,"index");
    }
    
    protected beforeRender = (req,res) => {
       this.loadHelper("form");
       this.csrfReady(req);
    }
    
    bind = () => {
        let router = this.router;
        let csrfProtection = this.csrfProtection;
        let parseForm = this.parseForm;
        router.get("/",csrfProtection,this.index);
    }

}

export let router  = new chats().create();