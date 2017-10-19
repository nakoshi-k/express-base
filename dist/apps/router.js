"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const service_1 = require("./service");
const core_2 = require("../base/core");
const helpers = require("../base/helper");
const passport = require("passport");
const LocalStrategy = require("passport-local");
class router extends core_1.router {
    constructor(mount) {
        super(mount);
        this.name = "router";
        this.parent = {};
        this.mount = "router";
        this.auth = () => {
            let service = new service_1.service("users");
            let users = service.model;
            this.passport = passport;
            passport.use(new LocalStrategy({
                usernameField: 'name',
                passwordField: 'password',
                session: true
            }, (username, password, done) => {
                users.findOne({ where: { name: username } }).then(user => {
                    if (!user) {
                        return done(user);
                    }
                    user.authenticate(password).then(r => {
                        return done(null, r);
                    }).catch(e => {
                        return done(null, false);
                    });
                });
            }));
        };
        this.auth();
        this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname
        };
        let crud = new helpers.crud();
        let path = [__dirname, "views", "crud", "delete.ejs"].join(core_2.system.ds);
        crud.deleteTemplate = path;
        this.helper("crud", crud);
    }
}
exports.router = router;
