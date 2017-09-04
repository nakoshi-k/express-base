"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class router_base {
    constructor() {
        this.name = "router_base";
        this.useModel = true;
        this.csrfReady = (req, formHelper = "form") => {
            this.vars[formHelper].bind({ "csrf": req.csrfToken() });
        };
        this.bind = () => {
        };
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
        this.send = (req, res, content) => {
            res.send(content);
        };
        /**
         * view に渡す変数に追加
         */
        this.setData = (vars) => {
            this.vars = Object.assign(this.vars, vars);
        };
        const express = require("express");
        let router = express.Router();
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false });
        let csrf = require('csurf');
        let path = require("path");
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
        this.path = path;
        this.router = router;
        if (this.useModel === true) {
            let models = require('../models');
            this.models = models;
        }
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
