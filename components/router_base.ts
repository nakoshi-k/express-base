import * as express from "express";
import * as sequelize from "sequelize";

export abstract class router_base{
    abstract name = "router_base";
    protected router:express.Router;
    protected path : any;
    protected parseForm;
    protected csrfProtection;
    protected useModel = true;
    protected service:any;
    protected models : sequelize.ModelsHashInterface;
    protected model : sequelize.ModelsHashInterface;

    constructor(){
        const express = require("express"); 
        let router = express.Router();
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false })
        let csrf = require('csurf')
        let path = require("path");
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
        this.path = path;
        this.router = router;
    }

    public init = () => {
        this.loadService(this.name);
        this.loadModel();
    }

    public loadModel = () => {
        if ( this.useModel === true ){
            this.models = this.service.models;
            this.model = this.service.model;
        }
    }

    public loadService = (name:string) => {
        let service = require("../services/" + name + "_service");
        this.service = new service[ name +"_service"]();
    }

    protected csrfReady = (req , formHelper = "form") => {
        this.vars[formHelper].bind( {"csrf" : req.csrfToken()});
    }

    abstract bind = () => {

    }

    public create = () => {
        this.init();
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
           view = "." + sep + this.name + sep + "views" + sep + view;
        }
        this.setData(vars);
        res.render( view ,this.vars);
    } 
    
    public send = (req,res,content:string) => {
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
        this.vars[name] = require(".." + sep + ".." + sep + "helpers" + sep + name + "_helper");
    }

}

