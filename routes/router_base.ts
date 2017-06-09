
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

    protected csrfReady(req , formHelper = "form"){
        this.vars[formHelper].bind( {"csrf" : req.csrfToken()});
    }

    abstract bind = () => { }
   
    public create = () => {
        this.bind(); 
        return this.router;
    }
    
    protected beforeRender = (req,res) => {

    }

    public vars = { "title" : "", "csrf" : "" };

    public render = ( req , res , view : string = "",vars = {}) => {
        this.beforeRender(req,res);
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

    /**
     * view に渡す変数に追加
     */
        
    public setData = (vars:{}) =>{
        this.vars = Object.assign(this.vars, vars);
    }

    /**
     * post 判定
     */

    public isPost(res){
        return ( res.method === "POST") ? true : false;
    }

    /*
        ajax 判定
    */

    public isXhr(res){
        return res.xhr;
    }

    /*
        view で使うヘルパーのロード
    */

    public loadHelper(name:string){
        let sep :string = this.path.sep;
        this.vars[name] = require(".." + sep + "helpers" + sep + name + "_helper");
    }

}

