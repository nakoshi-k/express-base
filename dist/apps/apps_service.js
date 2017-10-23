"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const passport = require("passport");
const passportLocal = require("passport-local");
class service extends core_1.service {
    constructor() {
        super(...arguments);
        this.name = "service";
        this.auth = () => {
            const LocalStrategy = passportLocal.Strategy;
            let users = this.models["users"];
            this.passport = passport;
            this.passport.serializeUser(function (user, done) {
                done(null, user.id);
            });
            this.passport.deserializeUser(function (id, done) {
                users.findById(id).then(user => {
                    done(null, user);
                }).catch(e => {
                    done(e);
                });
            });
            this.passport.use(new LocalStrategy({
                usernameField: 'account',
                passwordField: 'password',
                session: true
            }, function (username, password, done) {
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
}
exports.service = service;
