"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportLocal = require("passport-local");
const models = require("../../models");
const moment = require("moment");
const logger_users_1 = require("./logger_users");
const logger = new logger_users_1.logger_users();
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
                        /** failed */
                        done("account", false, { "message": "invalid user" });
                        return;
                    }
                    user.authenticate(password).then(r => {
                        /**success */
                        logger.access_log(user.id, "login");
                        done(null, user);
                        return;
                    }).catch(e => {
                        /** failed */
                        done("password", user, { "message": "invalid password" });
                        return;
                    });
                }).catch(e => {
                    return done(e, false, { "message": "can't access storage" });
                });
            }));
        };
        this.login = (req, res, next, type = "local") => {
            const login = (resolve, reject) => {
                passport.authenticate(type, (err, user, info) => {
                    if (info) {
                        reject(info);
                        return;
                    }
                    if (err) {
                        if (err === "account") {
                            reject("account");
                            return;
                        }
                        if (err === "password") {
                            reject("password");
                            return;
                        }
                    }
                    if (!user) {
                        reject("account");
                        return;
                    }
                    req.logIn(user, (login_err) => {
                        if (login_err) {
                            reject("internal");
                            return;
                        }
                        resolve(user);
                    });
                })(req, res, next);
            };
            return new Promise(login);
        };
        this.logout = (req) => {
            const logout = (resolve, reject) => {
                if (!req.user) {
                    reject("user login yet");
                }
                try {
                    const user_id = req.user.id;
                    req.logOut();
                    logger.access_log(user_id, "logout");
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            };
            return new Promise(logout);
        };
        this.user = (req) => {
            const user = (resolve, reject) => {
                if (!req.user) {
                    reject("no user");
                    return;
                }
                const user = req.user.toJSON();
                logger.get_user_log(user.id, "login").then((log) => {
                    let last_login = log.pop().date;
                    user.last_login = moment(last_login).format("YYYY-MM-DD HH:mm:ss");
                    resolve(user);
                }).catch(e => {
                    console.log(e);
                    reject(e);
                });
            };
            return new Promise(user);
        };
    }
    get passport() {
        return passport;
    }
}
exports.authorization = authorization;
