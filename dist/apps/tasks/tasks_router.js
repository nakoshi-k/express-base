"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const tasks_service_1 = require("./tasks_service");
const helpers = require("../../base/helper");
class tasks_router extends router_1.router {
    constructor() {
        super();
        this.name = "tasks";
        this.beforeRender = (req, res) => {
            this.helper("form", new helpers.form());
            this.helper("pagination", new helpers.pagination());
            this.csrfReady(req);
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
                if (!result) {
                    res.redirect("/tasks");
                }
                this.setData({ "task": result.dataValues });
                this.render(req, res, "view");
            });
        };
        this.edit = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                if (!result) {
                    res.redirect("/tasks");
                }
                this.setData({ "task": result.dataValues });
                this.render(req, res, "edit");
            });
        };
        this.delete = (req, res) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                if (result) {
                    result.destroy().then(() => {
                        res.sendStatus(200);
                    });
                    return;
                }
                res.sendStatus(500);
            });
        };
        this.insert = (req, res, next) => {
            let entity = this.model.build(req.body);
            entity.save().then(() => {
                if (this.isXhr(req)) {
                    res.redirect("/tasks");
                    return;
                }
                res.redirect("/tasks");
            }).catch((err) => {
                if (this.isXhr(req)) {
                    this.add(req, res, next);
                    return;
                }
                this.add(req, res, next);
            });
        };
        this.update = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((task) => {
                task.update(req.body).then((result) => {
                    if (this.isXhr(req)) {
                        res.status(201);
                        res.json(result);
                        return;
                    }
                    //res.redirect("/tasks");
                }).catch((err) => {
                    if (this.isXhr(req)) {
                        res.status(400);
                        res.json(err);
                        return;
                    }
                    this.edit(req, res, next);
                });
            }).catch((err) => {
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
            return router;
        };
        this.service = new tasks_service_1.tasks_service(this.name);
    }
}
exports.tasks_router = tasks_router;
