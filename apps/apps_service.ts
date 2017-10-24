import { service as core_service} from "../base/core"
import * as passport from "passport";
import * as passportLocal from "passport-local";

export class service extends core_service{
    public name = "service";
    public passport
    public passport_strategy
    
    public auth = () =>  {
        const LocalStrategy = passportLocal.Strategy;
        let users = this.models["users"];
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
            (username, password, done) => {
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



}