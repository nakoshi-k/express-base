import * as e from "express";
import {router as core_router,routing_map} from "../base/core/router";
import {service as apps_service} from "./apps_service"
import { system } from "../base/core";
import * as helpers from "../base/helper";
import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as csurf from "csurf";


export {routing_map} from "../base/core/router"

export interface request extends e.Request{
    csrfToken : () => string,
    //isAuthenticated : () => void,
    logIn : (user,callback) => boolean
    logOut: () => void,
    user : {
        id : string,
        name : string,
        mail : string
    }
}

export interface response extends e.Response{

}

export interface next extends e.NextFunction{

}


let body_csrf = (req:request,res :response ,next:next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
}

let is_authenticated = (req:request,res :response ,next:next) => {
    next();
}

let rbac = (req:request,res :response ,next:next) => {
    next();
}


export class router extends core_router{
    public parent = {}
    public auth;
    constructor (){
        super();
        this.renderer.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname 
        }

        /* middle ware */
        this.mw_regist( "csrf" ,  csurf({ cookie: true }) );
        this.mw_regist( "body_csrf" , body_csrf );
        this.mw_regist( "is_authenticated" , is_authenticated );
        this.mw_regist( "rbac", rbac );

    }

}