"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var router_1 = require("../router");
var tasks_service_1 = require("./tasks_service");
var helpers = require("../../base/helper");
var tasks_router = /** @class */ (function (_super) {
    __extends(tasks_router, _super);
    function tasks_router() {
        var _this = _super.call(this) || this;
        _this.name = "tasks";
        _this.beforeRender = function (req, res) {
            _this.helper("form", new helpers.form());
            _this.helper("pagination", new helpers.pagination());
            var crud = new helpers.crud();
            _this.helper("crud", crud);
            _this.csrfReady(req);
        };
        _this.search = function (req, res, next) {
            var pagination = _this.service.pagination();
            var conditions = _this.service.conditions(req);
            var tasks = pagination.find(conditions, req.query);
            tasks.then(function (result) {
                // for rows
                _this.setData({ tasks: result.rows });
                // for pagination
                _this.setData({ page: result.pagination });
                _this.render(req, res, "index");
            })["catch"](function (error) {
                _this.setData({ tasks: {} });
                _this.render(req, res, "index");
            });
        };
        _this.add = function (req, res, next) {
            //スキーマを取得してセットする。
            _this.setData({ "task": {} });
            _this.render(req, res, "add");
        };
        _this.view = function (req, res, next) {
            var model = _this.model;
            model.findById(req.params.id).then(function (result) {
                if (!result) {
                    res.redirect("/tasks");
                }
                _this.setData({ "task": result.dataValues });
                _this.render(req, res, "view");
            });
        };
        _this.edit = function (req, res, next) {
            var model = _this.model;
            model.findById(req.params.id).then(function (result) {
                if (!result) {
                    res.redirect("/tasks");
                }
                _this.setData({ "task": result.dataValues });
                _this.render(req, res, "edit");
            });
        };
        _this["delete"] = function (req, res) {
            var model = _this.model;
            model.findById(req.params.id).then(function (result) {
                if (result) {
                    result.destroy().then(function () {
                        res.send(200);
                    });
                    return;
                }
                res.send(500);
            });
        };
        _this.insert = function (req, res, next) {
            var entity = _this.model.build(req.body);
            entity.save().then(function () {
                if (_this.isXhr(req)) {
                    res.redirect("/tasks");
                    return;
                }
                res.redirect("/tasks");
            })["catch"](function (err) {
                if (_this.isXhr(req)) {
                    _this.add(req, res, next);
                    return;
                }
                _this.add(req, res, next);
            });
        };
        _this.update = function (req, res, next) {
            var model = _this.model;
            model.findById(req.params.id).then(function (task) {
                task.update(req.body).then(function (result) {
                    if (_this.isXhr(req)) {
                        res.redirect("/tasks");
                        return;
                    }
                    res.redirect("/tasks");
                })["catch"](function (err) {
                    if (_this.isXhr(req)) {
                        _this.edit(req, res, next);
                        return;
                    }
                    _this.edit(req, res, next);
                });
            });
        };
        _this.bind = function (router) {
            var csrfProtection = _this.csrfProtection;
            var parseForm = _this.parseForm;
            router.get("/", csrfProtection, _this.search);
            router.get("/page/:page", csrfProtection, _this.search);
            router.get("/add", csrfProtection, _this.add);
            router.get("/:id", csrfProtection, _this.view);
            router.post("/", parseForm, csrfProtection, _this.insert);
            router.get("/:id/edit", csrfProtection, _this.edit);
            router.put("/:id", csrfProtection, _this.update);
            router["delete"]("/:id", csrfProtection, _this["delete"]);
            return router;
        };
        _this.service = new tasks_service_1.tasks_service(_this.name);
        return _this;
    }
    return tasks_router;
}(router_1.router));
exports.tasks_router = tasks_router;
