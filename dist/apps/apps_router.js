"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../base/core/router");
const core_1 = require("../base/core");
const csurf = require("csurf");
let body_csrf = (req, res, next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
};
let is_authenticated = (req, res, next) => {
    next();
};
const rbac_1 = require("./middle_ware/rbac");
let rbac = new rbac_1.rbac();
class router extends router_1.router {
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
        this.mw_regist("rbac", rbac.create());
    }
}
exports.router = router;
