import { router as core_router} from "../base/core";
import {service as app_service} from "./service"
import { system } from "../base/core";
import * as helpers from "../base/helper";

import * as passport from "passport";
import * as LocalStrategy from "passport-local";


export class router extends core_router{
    public name = "router"
    public parent = {}
    public mount = "router"
    public passport
    public passport_strategy

    auth = () =>  {
        let service = new app_service("users");
        let users = service.model;
        this.passport = passport;
        passport.use(new LocalStrategy(
            {
                usernameField: 'name',
                passwordField: 'password',
                session: true
            },
            (username, password, done) => {
              users.findOne({ where :{ name : username } }).then(user => {
                
                if (!user) {
                    return done(user);
                }

                user.authenticate(password).then(r => {
                    return done(null,r)
                }).catch(e => {
                    return done(null, false);
                });

              })

            }
        ));
    }

    constructor (mount){
        super(mount)
        this.auth()


        this.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname 
        }
        let crud = new helpers.crud();
        let path = [__dirname,"views","crud","delete.ejs"].join(system.ds);
        crud.deleteTemplate = path;
        this.helper("crud" ,crud );
    }

}