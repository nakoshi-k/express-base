"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class router_base {
    constructor() {
        this.name = "router_base";
        this.bind = () => {
            let router = this.router;
        };
        this.create = () => {
            this.bind();
            return this.router;
        };
        this.beforeRender = () => {
        };
        this.vars = { "title": "" };
        this.render = (res, view = "index", vars = {}) => {
            this.beforeRender();
            let f = view.substring(1, 1);
            let sep = this.path.sep;
            if (f !== "." && f !== sep) {
                view = ".." + sep + "views" + sep + this.name + sep + view;
            }
            this.vars = Object.assign(this.vars, vars);
            console.log(this.vars);
            res.render(view, this.vars);
        };
        let express = require('express');
        let router = express.Router();
        let path = require("path");
        this.path = path;
        this.router = router;
    }
    csfr(req) {
        this.vars = Object.assign(this.vars, { "csfr": req.csrfToken() });
    }
}
exports.router_base = router_base;
