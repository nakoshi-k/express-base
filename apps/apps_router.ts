import {router as core_router} from "../base/core";
import {service as apps_service} from "./apps_service"
import { system } from "../base/core";
import * as helpers from "../base/helper";
import * as passport from "passport";
import * as passportLocal from "passport-local";

export class router extends core_router{
    public name = "router"
    public parent = {}
    public mount = "router"
    
    isAuthenticated = (req, res, next) =>{
        if (req.isAuthenticated()) {  // 認証済
            return next();
        }
        else {  // 認証されていない
            res.redirect('/users/login');  // ログイン画面に遷移
        }
    }

    service:apps_service;
    constructor (mount){
        super(mount)
        this.service = new apps_service("apps");
        this.service.auth();
        this.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname 
        }
    }

}