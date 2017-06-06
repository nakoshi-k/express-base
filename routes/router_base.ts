export class router_base{
    protected router:express.router;
    private name :string = "router_base";
    private path:any; 
    constructor(){
        let express = require('express');
        let router = express.Router();
        let path = require("path");
        this.path = path;
        this.router = router;
    }
    protected csfr(req){

        this.vars = Object.assign(this.vars, {"csfr" : req.csrfToken()});
    }
    protected bind = () => {
        let router = this.router;
    }
   
    public create = () => {
        this.bind(); 
        return this.router;
    }
    
    protected beforeRender = () => {

    }

    public vars = { "title" : "" };
    public render = ( res , view : string = "index",vars = {}) => {
        this.beforeRender();
        let f = view.substring(1,1);
        let sep :string = this.path.sep;
        if(f !== "." && f !== sep ){
           view = ".." + sep + "views" + sep + this.name + sep + view;
        }
        this.vars = Object.assign(this.vars, vars);
        console.log(this.vars);
        res.render( view ,this.vars);
    } 

}

