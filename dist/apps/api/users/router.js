"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../../apps_router");
const service_1 = require("./service");
exports.mapping = {
    idx: { type: "get", mount: "/", component: "search", middle_ware: null },
    login: { type: "post", mount: "/login", component: "login", middle_ware: null },
    logout: { type: "get", mount: "/logout", component: "logout", middle_ware: null },
    auth: { type: "get", mount: "/auth", component: "auth", middle_ware: null },
    page: { type: "get", mount: "/page/:page", component: "search", middle_ware: null },
    entity: { type: "get", mount: "/:id", component: "entity", middle_ware: null },
    insert: { type: "post", mount: "/", component: "insert", middle_ware: null },
    update: { type: "put", mount: "/:id", component: "update", middle_ware: null },
    delete: { type: "delete", mount: "/:id", component: "delete", middle_ware: null },
};
class router extends apps_router_1.router {
    constructor() {
        super();
        this.name = "users";
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
        this.login = (req, res, next) => {
            const passport = this.service.auth.passport;
            let rend = this.renderer.create(res);
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    rend.status(401);
                    rend.json({ password: [{ type: "invalid", message: "invalid password" }] });
                    return;
                }
                if (!user) {
                    rend.status(401);
                    rend.json({ account: [{ type: "invalid", message: "invalid account" }] });
                    return;
                }
                req.logIn(user, (login_err) => {
                    if (login_err) {
                        rend.status(500);
                        rend.json({ internal: [{ type: "error", message: "internal error" }] });
                        return;
                    }
                    rend.status(201);
                    rend.json(user);
                });
            })(req, res, next);
        };
        this.logout = (req, res, next) => {
            let rend = this.renderer.create(res);
            try {
                req.logOut();
                rend.status(201);
                rend.json({ message: "log out" });
            }
            catch (e) {
                rend.status(404);
                rend.json({});
            }
        };
        this.auth = (req, res, next) => {
            let rend = this.renderer.create(res);
            if (!req.user) {
                rend.status(401);
                rend.json({});
                return;
            }
            let user = req.user;
            rend.json(user);
        };
        this.service = new service_1.service(this.name);
    }
    get _mapping() {
        return exports.mapping;
    }
}
exports.router = router;
