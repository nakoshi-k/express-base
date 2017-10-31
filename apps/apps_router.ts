import * as e from "express";
import {core_routing} from "../core/core_routeing";
import {service as apps_service} from "./apps_service"
import { system } from "../core/lib/system";
import * as csurf from "csurf";
import ee from "../core/interfaces/express_extends" 
export {routing_map} from "../core/core_routeing"

let body_csrf = (req:ee.request,res :ee.response ,next:ee.next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
}

let is_authenticated = (req:ee.request,res :ee.response ,next:ee.next) => {
    next();
}


import {rbac as rbac_mw} from "./middlewares/rbac"
let rbac = new rbac_mw();

export class router extends core_routing{
    
    
    constructor (){
        super();
        this.renderer.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname 
        }

        /* middle ware */
        this.pre_mw_regist( "csrf" ,  csurf({ cookie: true }) );
        this.pre_mw_regist( "body_csrf" , body_csrf );
        this.pre_mw_regist( "is_authenticated" , is_authenticated );
        this.pre_mw_regist( "rbac", rbac.create() );

    }

}