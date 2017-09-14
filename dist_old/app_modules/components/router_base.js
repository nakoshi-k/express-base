"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class router_base {
    constructor() {
        this.name = "router_base";
        this.useModel = true;
        this.vars = { "title": "", "csrf": "" };
        this.init = (name) => {
            this.loadService(name);
        };
        this.loadService = (name) => {
            let sep = common_1.config.sep;
            let service = require(".." + sep + ".." + sep + "apps" + sep + name + sep + name + "_service");
            this.service = new service[name + "_service"](this.name);
        };
        this.csrfReady = (req, formHelper = "form") => {
            let csrf = req.csrfToken();
            this.vars["csrf"] = csrf;
            this.vars[formHelper].bind({ "csrf": csrf });
        };
        this.bind = (router) => {
            return router;
        };
        this.create = () => {
            const express = require("express");
            let router = express.Router();
            this.init(this.name);
            this.bind(router);
            return router;
        };
        this.beforeRender = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return [req, res];
        });
        this.render = (req, res, view = "", vars = {}) => {
            let before = this.beforeRender(req, res);
            before.then((result) => {
                let f = view.substring(1, 1);
                let sep = common_1.config.sep;
                if (f !== "." && f !== sep) {
                    let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                    let dir = viewDir + "apps" + sep + this.name + sep + "views";
                    req.app.set('views', dir);
                    view = view;
                }
                this.setData(vars);
                res.render(view, this.vars, (err, html) => {
                    if (!err) {
                        res.send(html);
                        return;
                    }
                    let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                    req.app.set('views', viewDir + "apps" + sep + "common" + sep + "views");
                    res.status = err.status;
                    res.render("error", { "message": err.message, "error": err });
                });
            });
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
        /*
            view で使うヘルパーのロード
        */
        this._hlp = [];
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false });
        let csrf = require('csurf');
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
    }
    get models() {
        return this.service.models;
    }
    get model() {
        return this.service.model;
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
    loadHelper(name, next = (hlp) => { return Promise.resolve(); }) {
        let sep = common_1.config.sep;
        let path = ".." + sep + "helpers" + sep + name + "_helper";
        let hlp = require(path);
        this.vars["hlp"][name] = require(path);
        return next(hlp);
    }
}
exports.router_base = router_base;
