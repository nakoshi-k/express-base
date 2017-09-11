"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("../router_base");
class tasks_router extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.search = (req, res, next) => {
            let tasks = this.service.pagination({
                where: this.service.conditionsBuild(req.query),
                limit: 10
            }, req.query);
            tasks.then((result) => {
                // fir riw
                this.setData({ tasks: result.rows });
                // for pagination
                console.log(result.pagination);
                this.setData({ pagination: result.pagination });
                this.render(req, res, "index");
            }).catch((error) => {
                this.render(req, res, "index");
            });
        };
        this.add = (req, res, next) => {
            //スキーマを取得してセットする。
            this.setData({ "task": { title: "title", priod: "2016-10-18" } });
            this.render(req, res, "add");
        };
        this.view = (req, res, next) => {
            this.setData({ "task": { title: "title", priod: "2016-10-18" } });
            this.render(req, res, "view");
        };
        this.edit = (req, res, next) => {
        };
        this.delete = (req, res) => {
        };
        this.insert = (req, res, next) => {
            let entity = this.model.build(req.body);
            entity.save().then(() => {
                res.redirect("/tasks");
            }).catch((e) => {
                console.log(e);
                this.add(req, res, next);
            });
        };
        this.update = (req, res, next) => {
        };
        this.beforeRender = (req, res) => {
            this.loadHelper("form");
            this.csrfReady(req);
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            let parseForm = this.parseForm;
            router.get("/", csrfProtection, this.search);
            router.get("/add", csrfProtection, this.add);
            router.get("/:id", csrfProtection, this.view);
            router.post("/", parseForm, csrfProtection, this.insert);
            router.get("/:id/edit", csrfProtection, this.edit);
            router.delete("/:id", csrfProtection, this.delete);
            router.put("/:id", csrfProtection, this.update);
            return router;
        };
    }
}
exports.tasks_router = tasks_router;
