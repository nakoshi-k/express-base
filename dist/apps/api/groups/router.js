"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../../apps_router");
const service_1 = require("./service");
exports.mapping = {
    idx: { method: "get", route: "/", component: "search", middle_ware: null },
    page: { method: "get", route: "/page/:page", component: "search", middle_ware: null },
    entity: { method: "get", route: "/:id", component: "entity", middle_ware: null },
    insert: { method: "post", route: "/", component: "insert", middle_ware: null },
    update: { method: "put", route: "/:id", component: "update", middle_ware: null },
    delete: { method: "delete", route: "/:id", component: "delete", middle_ware: null }
};
class router extends apps_router_1.router {
    constructor() {
        super();
        this.name = "groups";
        this._mapping = () => {
            return exports.mapping;
        };
        this.search = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.page(req, res).then((result) => {
                rend.status(201);
                rend.json(rend.toJSON());
            }).catch((error) => {
                rend.status(400);
                rend.json(rend.toJSON());
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
