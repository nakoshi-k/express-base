import * as passport from "passport";
import * as passportLocal from "passport-local";
import  * as models from "../../models";
import * as sequelize from "sequelize";
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
        passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
        passport.deserializeUser(function(id, done) {
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