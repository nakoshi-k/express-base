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
const core_1 = require("../../base/core");
const tasks_service_1 = require("./tasks_service");
const helpers = require("../../base/helper");
class tasks_router extends core_1.router {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.beforeRender = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.helper("form", new helpers.form_helper());
            this.helper("pagination", new helpers.pagination_helper());
            let crud = new helpers.crud_support_helper();
            this.helper("crud_support", crud);
            yield crud.load();
            this.csrfReady(req);
            return [req, res];
        });
        this.init = () => {
            this.service = new tasks_service_1.tasks_service(this.name);
        };
        this.search = (req, res, next) => {
            let pagination = this.service.pagination();
            let conditions = this.service.conditions(req);
            let tasks = pagination.find(conditions, req.query);
            tasks.then((result) => {
                // for rows
                this.setData({ tasks: result.rows });
                // for pagination
                this.setData({ page: result.pagination });
                this.render(req, res, "index");
            }).catch((error) => {
                this.setData({ tasks: {} });
                this.render(req, res, "index");
            });
        };
        this.add = (req, res, next) => {
            //スキーマを取得してセットする。
            this.setData({ "task": {} });
            this.render(req, res, "add");
        };
        this.view = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                this.setData({ "task": result.dataValues });
                this.render(req, res, "view");
            });
        };
        this.edit = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                this.setData({ "task": result.dataValues });
                this.render(req, res, "edit");
            });
        };
        this.delete = (req, res) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                console.log(result);
                if (result) {
                    result.destroy().then(() => {
                        res.send(200);
                    });
                    return;
                }
                res.send(500);
            });
        };
        this.insert = (req, res, next) => {
            let entity = this.model.build(req.body);
            entity.save().then(() => {
                res.redirect("/tasks");
            }).catch((err) => {
                this.add(req, res, next);
            });
        };
        this.update = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((task) => {
                task.update(req.body).then((result) => {
                    res.redirect("/tasks");
                }).catch((err) => {
                    this.edit(req, res, next);
                });
            });
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            let parseForm = this.parseForm;
            router.get("/", csrfProtection, this.search);
            router.get("/page/:page", csrfProtection, this.search);
            router.get("/add", csrfProtection, this.add);
            router.get("/:id", csrfProtection, this.view);
            router.post("/", parseForm, csrfProtection, this.insert);
            router.get("/:id/edit", csrfProtection, this.edit);
            router.put("/:id", csrfProtection, this.update);
            router.delete("/:id", csrfProtection, this.delete);
            router.post("/:id/delete", csrfProtection, this.delete);
            return router;
        };
    }
}
exports.tasks_router = tasks_router;
