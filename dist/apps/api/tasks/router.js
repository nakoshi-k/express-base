"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../../apps_router");
const service_1 = require("./service");
exports.mapping = {
    idx: { method: "get", route: "/", middleware: "search", pre: null },
    page: { method: "get", route: "/page/:page", middleware: "search", pre: null },
    entity: { method: "get", route: "/:id", middleware: "entity", pre: null },
    insert: { method: "post", route: "/", middleware: "insert", pre: null },
    update: { method: "put", route: "/:id", middleware: "update", pre: null },
    delete: { method: "delete", route: "/:id", middleware: "delete", pre: null }
};
class router extends apps_router_1.router {
    constructor() {
        super();
        this.name = "tasks";
        this._mapping = () => {
            return exports.mapping;
        };
        this.search = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.pagination(req, res).then((result) => {
                rend.status(201);
                rend.json(result);
            }).catch((error) => {
                let data = {};
                data[this.entities_name] = {};
                data["page"] = {};
                rend.status(400);
                rend.json(data);
            });
        };
        this.entity = (req, res, next) => {
            let model = this.model;
            let data = {};
            let rend = this.renderer.create(res);
            model.findById(req.params.id).then((result) => {
                if (!result) {
                    throw Error;
                }
                rend.status(201);
                rend.json(result);
            }).catch((err) => {
                data[this.entities_name] = {};
                rend.status(401);
                rend.json(data);
            });
        };
        this.delete = (req, res) => {
            let model = this.model;
            let rend = this.renderer.create(res);
            model.findById(req.params.id).then((result) => {
                if (result) {
                    result.destroy().then(() => {
                        rend.status(204);
                        rend.json({});
                    }).catch(e => {
                        rend.status(500);
                        rend.json({});
                    });
                }
                else {
                    rend.status(500);
                    rend.json({});
                }
            });
        };
        this.insert = (req, res, next) => {
            let entity = this.model.build(req.body);
            let rend = this.renderer.create(res);
            entity.save().then((result) => {
                rend.status(201);
                rend.json(entity.dataValues);
            }).catch((err) => {
                rend.status(400);
                rend.json(this.service.validationError(err));
            });
        };
        this.update = (req, res, next) => {
            let model = this.model;
            let rend = this.renderer.create(res);
            model.findById(req.params.id).then((entity) => {
                entity.update(req.body).then((result) => {
                    rend.status(201);
                    rend.json(result);
                }).catch((err) => {
                    rend.status(400);
                    rend.json(this.service.validationError(err));
                });
            }).catch((err) => {
                rend.status(400);
                rend.json(err);
            });
        };
        this.service = new service_1.service(this.name);
    }
}
exports.router = router;
