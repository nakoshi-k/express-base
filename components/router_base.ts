import * as express from "express";
import * as sequelize from "sequelize";
import * as service from "./service_base";
import {config} from "../common";

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
        let service = require( "." + sep + this.name + sep + name + "_service");
        this.service = new service[ name +"_service"](this.name);
    }

    protected csrfReady = (req , formHelper = "form") => {
        this.vars[formHelper].bind( {"csrf" : req.csrfToken()});
    }

    abstract bind = (router:express.Router) : express.Router => {
        return router;
    }

    public create = () => {
        const express = require("express");
        let router = express.Router();
        this.init(this.name);
        this.bind(router); 
        return router;
    }
    
    protected beforeRender = (req,res) => {

    }

    public render = ( req , res , view : string = "",vars = {}) => {
        this.beforeRender(req,res);
        let f = view.substring(1,1);
        let sep :string = config.sep;

        if(f !== "." && f !== sep ){
           view =  this.name + sep +  view;
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
        let sep :string = config.sep;
        this.vars[name] = require(  ".." + sep + "helpers" + sep + name + "_helper");
    }

}

