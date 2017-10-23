"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const apps_service_1 = require("./apps_service");
const core_2 = require("../base/core");
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
        this.service = new apps_service_1.service("apps");
        this.service.auth();
        this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname
        };
    }
}
exports.router = router;
