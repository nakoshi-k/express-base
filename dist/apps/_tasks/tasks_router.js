"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const tasks_service_1 = require("./tasks_service");
const helpers = require("../../base/helper");
const bodyParser = require("body-parser");
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
                this.setData({
                    tasks: result.rows,
                    page: result.pagination
                });
                this.render(req, res, "index");
            }).catch((error) => {
                this.setData({ tasks: {} });
                this.render(req, res, "index");
            });
        };
        this.add = (req, res, next) => {
            console.log(req.body);
            //スキーマを取得してセットする。
            this.setData({ "task": this.model.schema });
            if (req.body) {
                this.setData({ "task": req.body });
            }
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
                        res.sendStatus(204);
                    });
                    return;
                }
                res.sendStatus(500);
            });
        };
        this.insert = (req, res, next) => {
            console.log(req.body);
            let entity = this.model.build(req.body);
            entity.save().then((res) => {
                console.log(res);
                if (this.isXhr(req)) {
                    res.status(201);
                    res.json(res.dataValues);
                    return;
                }
                res.redirect("/tasks");
            }).catch((err) => {
                console.log(err);
                req.body.errors = this.service.validationError(err);
                if (this.isXhr(req)) {
                    res.status(400);
                    res.json(req.body.errors);
                    return;
                }
                this.add(req, res, next);
            });
        };
        this.update = (req, res, next) => {
            console.log(req.body);
            let model = this.model;
            model.findById(req.params.id).then((task) => {
                task.update(req.body).then((result) => {
                    if (this.isXhr(req)) {
                        res.status(201);
                        res.json(result);
                        return;
                    }
                    res.redirect("/tasks");
                }).catch((err) => {
                    console.log("ww");
                    if (this.isXhr(req)) {
                        req.body.errors = this.service.validationError(err);
                        res.status(400);
                        res.json(req.body);
                        return;
                    }
                    this.edit(req, res, next);
                });
            }).catch((err) => {
                if (this.isXhr(req)) {
                    res.status(400);
                    res.json(err);
                    return;
                }
            });
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            router.use(bodyParser.urlencoded({ extended: false }));
            router.get("/", csrfProtection, this.search);
            router.get("/page/:page", csrfProtection, this.search);
            router.get("/add", csrfProtection, this.add);
            router.get("/:id", csrfProtection, this.view);
            router.post("/", csrfProtection, this.insert);
            router.get("/:id/edit", csrfProtection, this.edit);
            router.put("/:id", csrfProtection, this.update);
            router.delete("/:id", csrfProtection, this.delete);
            return router;
        };
        this.service = new tasks_service_1.tasks_service(this.name);
    }
}
exports.tasks_router = tasks_router;
