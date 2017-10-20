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
    public passport
    public passport_strategy

    isAuthenticated = (req, res, next) =>{
        if (req.isAuthenticated()) {  // 認証済
            return next();
        }
        else {  // 認証されていない
            res.redirect('/users/login');  // ログイン画面に遷移
        }
    }

    auth = () =>  {
        const LocalStrategy = passportLocal.Strategy;
        let service = new apps_service("users");
        let users = service.model;
        this.passport = passport;

        this.passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
        this.passport.deserializeUser(function(id, done) {
            users.findById(id).then(user => {
                done(null,user)
            }).catch(e => {
                done(e)
            })
          });

        this.passport.use(new LocalStrategy(
            {
                usernameField: 'account',
                passwordField: 'password',
                session: true
            },
            function(username, password, done) {
                let where : any = { name : username };
                if(/@/gi.test(username)){
                    where = { mail : username };
                }
                users.findOne({ where : where }).then(user => {
                    if (!user) {
                        done("invalid user", false , {"message" : "invalid user"} );
                        return;
                    }
                    user.authenticate(password).then(r => {
                        done(null,user)
                        return
                    }).catch( e => {
                        done(e, false , {"message" : "invalid password" });
                        return
                    });

                }).catch(e => {
                    return done(e ,false , {"message" : "can't access storage" })
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
    }

}