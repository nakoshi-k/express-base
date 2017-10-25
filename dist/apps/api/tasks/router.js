"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../../apps_router");
const service_1 = require("./service");
exports.mapping = {
    idx: { type: "get", mount: "/", component: "search", middle_ware: null },
    page: { type: "get", mount: "/page/:page", component: "search", middle_ware: null },
    entity: { type: "get", mount: "/:id", component: "entity", middle_ware: null },
    insert: { type: "post", mount: "/", component: "insert", middle_ware: null },
    update: { type: "put", mount: "/:id", component: "update", middle_ware: null },
    delete: { type: "delete", mount: "/:id", component: "delete", middle_ware: null }
};
class router extends apps_router_1.router {
    constructor() {
        super();
        this.name = "tasks";
        this.search = (req, res, next) => {
            let pagination = this.service.pagination();
            let conditions = this.service.conditions(req);
            let entities = pagination.find(conditions, req.query);
            let data = {};
            let rend = this.renderer.create(res);
            entities.then((result) => {
                data[this.entities_name] = result.rows;
                data["page"] = result.pagination;
                rend.status(201);
                rend.json(data);
            }).catch((error) => {
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
    get _mapping() {
        return exports.mapping;
    }
}
exports.router = router;
