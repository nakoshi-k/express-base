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
        this.name = "groups";
        this._mapping = () => {
            return exports.mapping;
        };
        this.search = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.pagination(req, res).then((result) => {
                rend.status(201);
                rend.json(rend.toJSON());
            }).catch((error) => {
                let data = {};
                data[this.entities_name] = {};
                data["page"] = {};
                rend.status(400);
                rend.json(data);
            });
        };
        this.entity = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.get_entity(req.params.id).then((r) => {
                rend.status(201);
                rend.json(r);
            }).catch((err) => {
                let data = {};
                data[this.entities_name] = {};
                rend.status(401);
                rend.json(data);
            });
        };
        this.delete = (req, res) => {
            let rend = this.renderer.create(res);
            this.service.delete_entity(req.params.id).then(r => {
                rend.status(204);
                rend.json({});
            }).catch(err => {
                console.log(err);
                rend.status(500);
                rend.json({});
            });
        };
        this.insert = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.save_entity(req.body).then(r => {
                rend.status(201);
                rend.json(r.toJSON());
            }).catch(err => {
                rend.status(400);
                rend.json(this.service.validationError(err));
            });
        };
        this.update = (req, res, next) => {
            let rend = this.renderer.create(res);
            this.service.update_entity(req.params.id, req.body).then(r => {
                rend.status(201);
                rend.json(r.toJSON());
            }).catch(err => {
                rend.status(400);
                rend.json(this.service.validationError(err));
            });
        };
        this.service = new service_1.service(this.name);
    }
}
exports.router = router;
