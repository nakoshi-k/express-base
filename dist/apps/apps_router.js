"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_routeing_1 = require("../core/core_routeing");
const system_1 = require("../core/lib/system");
const csurf = require("csurf");
let body_csrf = (req, res, next) => {
    res.locals["csrf"] = req.csrfToken();
    next();
};
let is_authenticated = (req, res, next) => {
    next();
};
const rbac_1 = require("./middlewares/rbac");
let rbac = new rbac_1.rbac();
class router extends core_routeing_1.core_routing {
    constructor() {
        super();
        this.renderer.views = {
            common: __dirname + system_1.system.ds + "views",
            typical: __dirname
        };
        /* middle ware */
        this.pre_mw_regist("csrf", csurf({ cookie: true }));
        this.pre_mw_regist("body_csrf", body_csrf);
        this.pre_mw_regist("is_authenticated", is_authenticated);
        this.pre_mw_regist("rbac", rbac.create());
    }
}
exports.router = router;
