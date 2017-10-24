"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_router_1 = require("../base/core/new_router");
const core_1 = require("../base/core");
const csurf = require("csurf");
/*
    middle ware
*/
let body_csrf = (req, res, next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
};
let is_authenticated = (req, res, next) => {
    next();
};
let rbac = (req, res, next) => {
    next();
};
class router extends new_router_1.router {
    constructor() {
        super();
        this.parent = {};
        this.renderer.views = {
            common: __dirname + core_1.system.ds + "views",
            typical: __dirname
        };
        /* middle ware */
        this.mw_regist("csrf", csurf({ cookie: true }));
        this.mw_regist("body_csrf", body_csrf);
        this.mw_regist("is_authenticated", is_authenticated);
        this.mw_regist("rbac", rbac);
    }
}
exports.router = router;
