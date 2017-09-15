import * as express from "express";
import * as sequelize from "sequelize";
import * as service from "./service";
import * as bodyParser from "body-parser";
import * as csurf from "csurf";

import {config,helper} from "../core";

export abstract class router{
    abstract name = "router";
    protected parseForm;
    protected csrfProtection;
    protected useModel = true;
    public vars = { "title" : "", "csrf" : "" , "hlp" : {} };
    protected service:service.service;

    get models(){
        return this.service.models;
    }
    get model(){
        return this.service.model;
    }

    constructor(){
        let parseForm = bodyParser.urlencoded({ extended: false })
        let csrf = csurf;
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
    }

    protected csrfReady = (req , form = "form") => {
        let csrf = req.csrfToken();
        this.vars["csrf"] = csrf;
        this.vars.hlp[form].bind = {"csrf" : csrf};
    }

    abstract bind = (router:express.Router) : express.Router => {
        return router;
    }

    public create = () => {
        const express = require("express");
        let router = express.Router();
        this.bind(router); 
        return router;
    }
    
    protected beforeRender = (req,res) => {
    
    }

    public loading = async () =>  {
        // helper loading
        let helpers = this.vars.hlp;
        for(var key in helpers){
            await helpers[key].load();
        }
        return true;
    }

    public render = ( req , res , view : string = "",vars = {}) => {
        
        this.setData(vars);
        
        this.beforeRender(req,res);
        
        let loading = this.loading();
        loading.then( (result) => {
            let f = view.substring(1,1);
            let sep :string = config.sep;
            
            if(f !== "." && f !== sep ){
               let viewDir = __dirname + sep + ".." + sep + ".." + sep;
               let dir =  viewDir + "apps" + sep + this.name + sep  +"views";
               req.app.set('views', dir);
               view = view;
            }
    
            res.render( view ,this.vars , (err,html) => {
                if(!err){
                    res.send(html);
                    return;
                }
                let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                req.app.set('views', viewDir + "apps" + sep + "common" + sep + "views" );
                res.status = err.status;
                res.render("error", {"message" : err.message , "error" :err });
            });
        }).catch((err) => {
            res.status(500);
            res.send("error" ,{error : err});
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
    
    public helper( name :string , helper:helper ){
        this.vars.hlp[name] = helper;
    }

}

