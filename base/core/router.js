"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bodyParser = require("body-parser");
var csurf = require("csurf");
var core_1 = require("../core");
var router = /** @class */ (function () {
    function router() {
        var _this = this;
        this.name = "router";
        this.useModel = true;
        this.vars = { "title": "express Application", "csrf": "", "hlp": {} };
        this.csrfReady = function (req, form) {
            if (form === void 0) { form = "form"; }
            var csrf = req.csrfToken();
            _this.vars["csrf"] = csrf;
            _this.vars.hlp[form].bind = { "csrf": csrf };
        };
        this.bind = function (router) {
            return router;
        };
        this.create = function () {
            var express = require("express");
            var router = express.Router();
            _this.bind(router);
            return router;
        };
        this.beforeRender = function (req, res) {
        };
        this.loaders = [Promise.resolve];
        this.loading = function () { return __awaiter(_this, void 0, void 0, function () {
            var helpers, _a, _b, _i, key, loaders, _c, _d, _e, key;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        helpers = this.vars.hlp;
                        _a = [];
                        for (_b in helpers)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        return [4 /*yield*/, helpers[key].loading()];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        loaders = this.loaders;
                        _c = [];
                        for (_d in loaders)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 5;
                    case 5:
                        if (!(_e < _c.length)) return [3 /*break*/, 8];
                        key = _c[_e];
                        return [4 /*yield*/, loaders[key]];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7:
                        _e++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, true];
                }
            });
        }); };
        this._views = {
            common: "",
            typical: ""
        };
        this.render = function (req, res, view, vars) {
            if (view === void 0) { view = ""; }
            if (vars === void 0) { vars = {}; }
            _this.setData(vars);
            _this.beforeRender(req, res);
            var loading = _this.loading();
            loading.then(function (result) {
                var f = view.substring(1, 1);
                var ds = core_1.system.ds;
                if (f !== "." && f !== ds) {
                    var dir = _this.views.typical + ds + _this.name + ds + "views";
                    req.app.set('views', dir);
                    view = view;
                }
                res.render(view, _this.vars, function (err, html) {
                    if (!err) {
                        res.send(html);
                        return;
                    }
                    req.app.set('views', _this.views.common);
                    res.status = err.status;
                    if (res.app.get('env') === 'development') {
                        res.render("error", { "message": err.message, "error": err });
                        return;
                    }
                    res.render("error", { "message": err.message, "error": {} });
                });
            })["catch"](function (err) {
                res.status(500);
                res.send("error", { error: err });
            });
        };
        this.send = function (req, res, content) {
            res.send(content);
        };
        /**
         * view に渡す変数に追加
         */
        this.setData = function (vars) {
            _this.vars = Object.assign(_this.vars, vars);
        };
        var parseForm = bodyParser.urlencoded({ extended: false });
        var csrf = csurf;
        var csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
    }
    Object.defineProperty(router.prototype, "models", {
        get: function () {
            return this.service.models;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(router.prototype, "model", {
        get: function () {
            return this.service.model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(router.prototype, "views", {
        get: function () {
            return this._views;
        },
        set: function (paths) {
            this._views.common = paths.common;
            this._views.typical = paths.typical;
        },
        enumerable: true,
        configurable: true
    });
    /*
        ajax 判定
    */
    router.prototype.isXhr = function (res) {
        return res.xhr;
    };
    router.prototype.helper = function (name, helper) {
        this.vars.hlp[name] = helper;
    };
    return router;
}());
exports.router = router;
