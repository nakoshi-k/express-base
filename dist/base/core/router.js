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
const csurf = require("csurf");
const inflection = require("inflection");
const core_1 = require("../core");
class router {
    constructor() {
        this.name = "router";
        this.useModel = true;
        this.vars = { "title": "Application", "csrf": "", "hlp": {} };
        this.csrfReady = (req, form = "form") => {
            let csrf = req.csrfToken();
            this.vars["csrf"] = csrf;
            this.vars.hlp[form].bind = { "csrf": csrf };
        };
        this.bind = (router) => {
            return router;
        };
        this.create = () => {
            const express = require("express");
            let router = express.Router();
            this.bind(router);
            return router;
        };
        this.beforeRender = (req, res) => {
        };
        this.loaders = [Promise.resolve];
        this.loading = () => __awaiter(this, void 0, void 0, function* () {
            // helper loading
            let helpers = this.vars.hlp;
            for (var key in helpers) {
                yield helpers[key].loading();
            }
            //loaders loading;
            let loaders = this.loaders;
            for (var key in loaders) {
                yield loaders[key];
            }
            return true;
        });
        this._views = {
            common: "",
            typical: ""
        };
        this.render = (req, res, view = "", vars = {}) => {
            this.setData(vars);
            this.beforeRender(req, res);
            let loading = this.loading();
            loading.then((result) => {
                let f = view.substring(1, 1);
                let ds = core_1.system.ds;
                if (f !== "." && f !== ds) {
                    let dir = [this.views.typical, this.name, "views"].join(ds);
                    req.app.set('views', dir);
                    view = view;
                }
                res.render(view, this.vars, (err, html) => {
                    if (!err) {
                        res.send(html);
                        return;
                    }
                    req.app.set('views', this.views.common);
                    res.status = err.status;
                    if (res.app.get('env') === 'development') {
                        res.render("error", { "message": err.message, "error": err });
                        return;
                    }
                    res.render("error", { "message": err.message, "error": {} });
                });
            }).catch((err) => {
                res.status(500);
                res.send("error", { error: err });
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
        let csrf = csurf;
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
    }
    get models() {
        return this.service.models;
    }
    get model() {
        return this.service.model;
    }
    get entity_name() {
        return inflection.singularize(this.name);
    }
    get entities_name() {
        return inflection.pluralize(this.name);
    }
    get views() {
        return this._views;
    }
    set views(paths) {
        this._views.common = paths.common;
        this._views.typical = paths.typical;
    }
    /*
        ajax 判定
    */
    isXhr(res) {
        return res.xhr;
    }
    helper(name, helper) {
        this.vars.hlp[name] = helper;
    }
}
exports.router = router;
