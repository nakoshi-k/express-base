"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportLocal = require("passport-local");
const models = require("../../models");
class authorization {
    constructor() {
        this.name = "auth";
        this.id_field = "account";
        this.password_field = "password";
        this.session = true;
        this.local = () => {
            const LocalStrategy = passportLocal.Strategy;
            let users = models["users"];
            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });
            passport.deserializeUser(function (id, done) {
                users.findById(id).then(user => {
                    done(null, user);
                }).catch(e => {
                    done(e);
                });
            });
            passport.use(new LocalStrategy({
                usernameField: this.id_field,
                passwordField: this.password_field,
                session: this.session
            }, (username, password, done) => {
                let where = { name: username };
                if (/@/gi.test(username)) {
                    where = { mail: username };
                }
                users.findOne({ where: where }).then(user => {
                    if (!user) {
                        done("invalid user", false, { "message": "invalid user" });
                        return;
                    }
                    user.authenticate(password).then(r => {
                        done(null, user);
                        return;
                    }).catch(e => {
                        done(e, false, { "message": "invalid password" });
                        return;
                    });
                }).catch(e => {
                    return done(e, false, { "message": "can't access storage" });
                });
            }));
        };
    }
    get passport() {
        return passport;
    }
}
exports.authorization = authorization;
