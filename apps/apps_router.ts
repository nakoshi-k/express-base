import * as e from "express";
import {router as core_router,routing_map} from "../base/core/router";
import {service as apps_service} from "./apps_service"
import { system } from "../base/core";
import * as helpers from "../base/helper";
import * as csurf from "csurf";
import {request,response,next}  from "./interfaces/express_extend" 
export {routing_map} from "../base/core/router"

let body_csrf = (req:request,res :response ,next:next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
}

let is_authenticated = (req:request,res :response ,next:next) => {
    next();
}


import {rbac as rbac_mw} from "./middle_ware/rbac"
let rbac = new rbac_mw();

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
        this.mw_regist( "rbac", rbac.create() );

    }

}