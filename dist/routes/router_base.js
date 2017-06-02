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
        this.vars = {};
        this.render = (res, view = "index", vars = {}) => {
            this.beforeRender();
            let f = view.substring(1, 1);
            let sep = this.path.sep;
            if (f !== "." && f !== sep) {
                view = ".." + sep + "views" + sep + this.name + sep + view;
            }
            this.vars = Object.assign(this.vars, vars);
            res.render(view, this.vars);
        };
        this.get = (rute, func) => {
            this.router.get(rute, func);
        };
        this.post = (rute, func) => {
            this.router.post(rute, func);
        };
        let express = require('express');
        let router = express.Router();
        let path = require("path");
        this.path = path;
        this.router = router;
    }
}
exports.router_base = router_base;
