"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class router_base {
    constructor() {
        this.name = "router_base";
        this.bind = () => { };
        this.create = () => {
            this.bind();
            return this.router;
        };
        this.beforeRender = () => {
        };
        this.vars = { "title": "", "csrf": "" };
        this.render = (res, view = "index", vars = {}) => {
            this.beforeRender();
            let f = view.substring(1, 1);
            let sep = this.path.sep;
            if (f !== "." && f !== sep) {
                view = ".." + sep + "views" + sep + this.name + sep + view;
            }
            this.setData(vars);
            res.render(view, this.vars);
        };
        this.send = (res, content) => {
            res.send(content);
        };
        this.setData = (vars) => {
            this.vars = Object.assign(this.vars, vars);
        };
        let express = require('express');
        let router = express.Router();
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false });
        let csrf = require('csurf');
        let path = require("path");
        var csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
        this.path = path;
        this.router = router;
    }
    csrf(req) {
        this.vars = Object.assign(this.vars, { "csrf": req.csrfToken() });
    }
    isPost(res) {
        return (res.method === "POST") ? true : false;
    }
    isXhr(res) {
        return res.xhr;
    }
}
exports.router_base = router_base;
