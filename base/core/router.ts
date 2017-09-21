import * as express from "express";
import * as sequelize from "sequelize";
import * as service from "./service";
import * as bodyParser from "body-parser";
import * as csurf from "csurf";

import {system,helper} from "../core";

export abstract class router{
    abstract name = "router";
    protected parseForm;
    protected csrfProtection;
    protected useModel = true;
    public vars = { "title" : "Application", "csrf" : "" , "hlp" : {} };
    protected service:service.service;

    get models(){
        return this.service.models;
    }
    get model(){
        return this.service.model;
    }

    constructor(){
        let csrf = csurf;
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
    }

    protected csrfReady = (req , form = "form") => {
        let csrf = req.csrfToken();
        this.vars["csrf"] = csrf;
        this.vars.hlp[form].bind = {"csrf" : csrf};
    }

    protected bind = (router:express.Router) : express.Router => {
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
    
    public loaders  = [Promise.resolve];

    public loading = async () =>  {
        // helper loading
        let helpers = this.vars.hlp;
        for(var key in helpers){
            await helpers[key].loading();
        }
        
        //loaders loading;
        let loaders = this.loaders;
        for(var key in loaders){
            await loaders[key];
        }
        return true;
    }
    
    protected _views = {
        common : "",
        typical : ""   
    }
    
    get views() {
        return this._views;
    }
    
    set views(paths:{common:string,typical:string}){
        this._views.common = paths.common;
        this._views.typical = paths.typical;
    }

    public render = ( req , res , view : string = "",vars = {}) => {
        
        this.setData(vars);
        this.beforeRender(req,res);
        let loading = this.loading();
        loading.then( (result) => {
            let f = view.substring(1,1);
            let ds :string = system.ds;
            
            if(f !== "." && f !== ds ){
               let dir =  [this.views.typical , this.name , "views"].join(ds);
               req.app.set('views', dir);
               view = view;
            }
            res.render( view ,this.vars , (err,html) => {
                if(!err){
                    res.send(html);
                    return;
                }
                req.app.set('views', this.views.common );
                res.status = err.status;
                if(res.app.get('env') === 'development') {
                    res.render("error", {"message" : err.message , "error" :err });
                    return;
                }
                res.render("error", {"message" : err.message , "error" : {} });
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

