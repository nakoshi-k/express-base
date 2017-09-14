import * as express from "express";
import * as sequelize from "sequelize";
import * as service from "./service_base";
import {config} from "./common";

export abstract class router_base{
    abstract name = "router_base";
    protected parseForm;
    protected csrfProtection;
    protected useModel = true;
    public vars = { "title" : "", "csrf" : "" };
    protected service:service.service_base;

    get models(){
        return this.service.models;
    }
    get model(){
        return this.service.model;
    }

    constructor(){
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false })
        let csrf = require('csurf')
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
    }

    public init = (name:string) => {
        this.loadService(name);
    }

    public loadService = (name:string) => {
        let sep = config.sep;
        let service = require( ".." + sep + ".." + sep + "apps" + sep + name + sep  + name + "_service");
        this.service = new service[ name +"_service"](this.name);
    }

    protected csrfReady = (req , formHelper = "form") => {
        let csrf = req.csrfToken();
        this.vars["csrf"] = csrf; 
        this.vars[formHelper].bind( {"csrf" : csrf});
    }

    abstract bind = (router:express.Router) : express.Router => {
        return router;
    }

    public create = () => {
        const express = require("express");
        let router = express.Router();
        this.init(this.name); this.bind(router); 
        return router;
    }
    
    protected beforeRender = (req,res) => {
        return new Promise((resolve,reject) => {

        })
    }

    public render = ( req , res , view : string = "",vars = {}) => {
        
        let before = this.beforeRender(req,res);
        before.then( (result) => {
            let f = view.substring(1,1);
            let sep :string = config.sep;
    
            if(f !== "." && f !== sep ){
               let viewDir = __dirname + sep + ".." + sep + ".." + sep;
               let dir =  viewDir + "apps" + sep + this.name + sep  +"views";
               req.app.set('views', dir);
               view = view;
            }
    
            this.setData(vars);
            res.render( view ,this.vars , (err,html) => {
                if(!err){
                    res.send(html);
                    return;
                }
                let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                console.log(viewDir);
                req.app.set('views', viewDir + "apps" + sep + "common" + sep + "views" );
                res.status = err.status;
                res.render("error", {"message" : err.message , "error" :err });
            });
        })
        
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
        let sep :string = config.sep;
        let path = ".." + sep + "helpers" + sep + name + "_helper";
        this.vars[name] = require( path );
    }

}

