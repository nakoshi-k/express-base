"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const service_1 = require("./service");
const helpers = require("../../base/helper");
class router extends router_1.router {
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
            let entities = pagination.find(conditions, req.query);
            let data = {};
            entities.then((result) => {
                data[this.entities_name] = result.rows;
                data["page"] = result.pagination;
                if (this.isXhr(req)) {
                    res.status(201);
                    res.json(data);
                    return;
                }
                // for rows
                this.setData(data);
                this.render(req, res, "vue");
            }).catch((error) => {
                data[this.entities_name] = {};
                if (this.isXhr(req)) {
                    res.status(400);
                    res.json(data);
                    return;
                }
                this.setData(data);
                this.render(req, res, "vue");
            });
        };
        this.add = (req, res, next) => {
            console.log(req.body);
            //スキーマを取得してセットする。
            let data = {};
            data[this.entity_name] = {};
            if (req.body) {
                data[this.entity_name] = req.body;
            }
            this.setData(data);
            this.render(req, res, "vue");
        };
        this.view = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                if (!result) {
                    throw Error;
                }
                if (this.isXhr(req)) {
                    res.status(201);
                    res.json(result);
                    return;
                }
                let data = {};
                data[this.entity_name] = result.dataValues;
                this.setData(data);
                this.render(req, res, "vue");
            }).catch((res) => {
                if (this.isXhr(req)) {
                    res.status(401);
                    return;
                }
                res.redirect(`/${this.entities_name}`);
            });
        };
        this.edit = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                if (!result) {
                    res.redirect(`/${this.entities_name}`);
                }
                let data = {};
                data[this.entity_name] = result.dataValues;
                this.setData(data);
                this.render(req, res, "vue");
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
            let entity = this.model.build(req.body);
            entity.save().then((result) => {
                if (this.isXhr(req)) {
                    res.status(201);
                    res.json(entity.dataValues);
                    return;
                }
                res.redirect(`/${this.entities_name}`);
            }).catch((err) => {
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
            let model = this.model;
            model.findById(req.params.id).then((entity) => {
                entity.update(req.body).then((result) => {
                    if (this.isXhr(req)) {
                        res.status(201);
                        res.json(result);
                        return;
                    }
                    res.redirect(`/${this.entities_name}`);
                }).catch((err) => {
                    if (this.isXhr(req)) {
                        res.status(400);
                        res.json(err);
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
        this.service = new service_1.service(this.name);
        return this.create();
    }
}
exports.router = router;
