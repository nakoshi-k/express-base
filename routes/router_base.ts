
export abstract class router_base{
    abstract name = "router_base";
    protected router:express.router;
    protected path : any;
    protected parseForm;
    protected csrfProtection;

    constructor(){
        let express = require('express');
        let router = express.Router();
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false })
        let csrf = require('csurf')
        let path = require("path");
        var csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
        this.path = path;
        this.router = router;
    }

    protected csrf(req){
        this.vars = Object.assign(this.vars, {"csrf" : req.csrfToken()});
    }

    abstract bind = () => { }
   
    public create = () => {
        this.bind(); 
        return this.router;
    }
    protected beforeRender = () => {

    }
    public vars = { "title" : "", "csrf" : "" };

    public render = ( res , view : string = "index",vars = {}) => {
        this.beforeRender();
        let f = view.substring(1,1);
        let sep :string = this.path.sep;
        if(f !== "." && f !== sep ){
           view = ".." + sep + "views" + sep + this.name + sep + view;
        }
        this.setData(vars);
        res.render( view ,this.vars);
    } 
    
    public send = (res,content:string) => {
        res.send(content);
    }
    
    public setData = (vars:{}) =>{
        this.vars = Object.assign(this.vars, vars);
    }

    public isPost(res){
        return ( res.method === "POST") ? true : false;
    }
    public isXhr(res){
        return res.xhr;
    }
}

