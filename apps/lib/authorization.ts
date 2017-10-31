import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as models from "../../models";
import * as sequelize from "sequelize";
import * as fs from "fs";
import * as path from "path";
import * as moment from "moment";
import { logger_users as logger_class} from "./logger_users"
const logger = new logger_class();
import ee from "../../core/interfaces/express_extends"

export class authorization{
    public name = "auth";
    private id_field = "account"
    private password_field = "password"
    private session = true
    
    get passport(){
        return passport;
    }


    public local = () =>  {
        const LocalStrategy = passportLocal.Strategy;
        let users : sequelize.Model<any,any> = models["users"];
        passport.serializeUser(function(user : {id : string}, done) {
            done(null, user.id);
          });
          
        passport.deserializeUser(function(id : string, done) {
            users.findById(id).then(user => {
                done(null,user)
            }).catch(e => {
                done(e)
            })
          });

        passport.use(new LocalStrategy(
            {
                usernameField: this.id_field,
                passwordField: this.password_field,
                session: this.session
            },
            (username, password, done) => {
                let where : any = { name : username };
                if(/@/gi.test(username)){
                    where = { mail : username };
                }
                users.findOne({ where : where }).then(user => {
                    if (!user) {
                    /** failed */
                        done("account", false , {"message" : "invalid user"} );
                        return;
                    }
                    user.authenticate(password).then(r => {
                    /**success */
                        logger.access_log(user.id,"login");
                        done(null,user)
                        return
                    }).catch( e => {
                    /** failed */
                        done("password", user , {"message" : "invalid password" });
                        return
                    });

                }).catch(e => {
                    return done(e ,false , {"message" : "can't access storage" })
                })

            }
        ));
    }
    
    public login = (req:ee.request , res : ee.response , next :ee.next , type = "local" ) => {
        const login = (resolve,reject) => {
            passport.authenticate(type,(err,user,info) => {
                if(info){
                    reject(info)
                    return 
                }
                if (err) {
                    if(err === "account"){
                        reject("account")
                        return
                    }
                    if(err === "password"){
                        reject("password")
                        return
                    }
                }
    
                if (!user) {
                    reject("account")
                    return
                }
                req.logIn(user, (login_err) => {
                    if (login_err) {
                        reject("internal")
                        return
                    }
                    resolve(user)
                });
            })(req,res,next)
        } 
        return new Promise(login);
    }

    public logout = (req : ee.request) => {
        const logout = (resolve,reject) => {
            if(!req.user){
                reject("user login yet")
            }
            try{
                const user_id = req.user.id;
                req.logOut();
                logger.access_log( user_id ,"logout");
                resolve()
            }catch(e){
                reject(e)
            }
        }
        return new Promise(logout);
    }

    public user = (req:ee.request) => {
        const user = (resolve,reject) => {
            if(!req.user){
                reject("no user")
                return;
            }
            const user = req.user.toJSON();
            logger.get_user_log(user.id,"login").then((log : {[prop:string] : string}[]) => {
                let last_login = log.pop().date;
                user.last_login = moment(last_login).format("YYYY-MM-DD HH:mm:ss");
                resolve(user)
            }).catch(e => {
                console.log(e)
                reject(e)
            })
        }
        return new Promise(user);
    }

}