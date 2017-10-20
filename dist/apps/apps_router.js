"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const apps_service_1 = require("./apps_service");
const core_2 = require("../base/core");
const passport = require("passport");
const passportLocal = require("passport-local");
class router extends core_1.router {
    constructor(mount) {
        super(mount);
        this.name = "router";
        this.parent = {};
        this.mount = "router";
        this.isAuthenticated = (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }
            else {
                res.redirect('/users/login'); // ログイン画面に遷移
            }
        };
        this.auth = () => {
            const LocalStrategy = passportLocal.Strategy;
            let service = new apps_service_1.service("users");
            let users = service.model;
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
        this.auth();
        this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname
        };
    }
}
exports.router = router;
