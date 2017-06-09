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
        this.beforeRender = (req, res) => {
        };
        this.vars = { "title": "", "csrf": "" };
        this.render = (req, res, view = "", vars = {}) => {
            this.beforeRender(req, res);
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
        /**
         * view に渡す変数に追加
         */
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
        this.vars["form"].bind({ "csrf": req.csrfToken() });
    }
    /**
     * post 判定
     */
    isPost(res) {
        return (res.method === "POST") ? true : false;
    }
    /*
        ajax 判定
    */
    isXhr(res) {
        return res.xhr;
    }
    /*
        view で使うヘルパーのロード
    */
    loadHelper(name) {
        let sep = this.path.sep;
        this.vars[name] = require(".." + sep + "helpers" + sep + name + "_helper");
    }
}
exports.router_base = router_base;
