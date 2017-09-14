"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("../../app_modules/components/router_base");
class tasks_router extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
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
            console.log(req.params.id);
            let model = this.model;
            model.findById(req.params.id).then((task) => {
                task.update(req.body).then((result) => {
                    res.redirect("/tasks");
                }).catch((err) => {
                    this.edit(req, res, next);
                });
            });
        };
        this.beforeRender = (req, res) => {
            this.loadHelper("form");
            this.loadHelper("pagination");
            this.loadHelper("crud_support");
            this.csrfReady(req);
            return new Promise((resolve, reject) => {
                resolve(true);
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
