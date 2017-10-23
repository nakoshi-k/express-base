"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../../apps_router");
const service_1 = require("./service");
class router extends apps_router_1.router {
    constructor(mount) {
        super(mount);
        this.name = "users";
        this.beforeRender = (req, res) => {
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
                res.status(201);
                res.json(data);
            }).catch((error) => {
                data[this.entities_name] = {};
                data["page"] = {};
                res.status(400);
                res.json(data);
            });
        };
        this.entity = (req, res, next) => {
            let model = this.model;
            let data = {};
            model.findById(req.params.id).then((result) => {
                if (!result) {
                    throw Error;
                }
                res.status(201);
                res.json(result);
            }).catch((err) => {
                data[this.entities_name] = {};
                res.status(401);
                res.json(data);
            });
        };
        this.delete = (req, res) => {
            let model = this.model;
            model.findById(req.params.id).then((result) => {
                if (result) {
                    result.destroy().then(() => {
                        res.status(204);
                        res.json({});
                    }).catch(e => {
                        res.status(500);
                        res.json({});
                    });
                }
                else {
                    res.status(500);
                    res.json({});
                }
            });
        };
        this.insert = (req, res, next) => {
            let entity = this.model.build(req.body);
            entity.save().then((result) => {
                res.status(201);
                res.json(entity.dataValues);
            }).catch((err) => {
                res.status(400);
                res.json(this.service.validationError(err));
            });
        };
        this.update = (req, res, next) => {
            let model = this.model;
            model.findById(req.params.id).then((entity) => {
                entity.update(req.body).then((result) => {
                    res.status(201);
                    res.json(result);
                }).catch((err) => {
                    res.status(400);
                    res.json(this.service.validationError(err));
                });
            }).catch((err) => {
                res.status(400);
                res.json(err);
            });
        };
        this.login = (req, res, next) => {
            const passport = this.service.passport;
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    res.status(401);
                    res.json({});
                    return;
                }
                if (!user) {
                    res.status(401);
                    res.json({});
                    return;
                }
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(401);
                        res.json({});
                        return;
                    }
                    res.status(201);
                    res.json(user);
                });
            })(req, res, next);
        };
        this.logout = (req, res, next) => {
            req.logOut();
            res.send(201);
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            let auth = this.isAuthenticated;
            let map = [csrfProtection];
            router.post("/login", csrfProtection, this.login);
            router.get("/", ...map, this.search);
            router.get("/page/:page", ...map, this.search);
            router.get("/:id", ...map, this.entity);
            router.post("/", ...map, this.insert);
            router.put("/:id", ...map, this.update);
            router.delete("/:id", ...map, this.delete);
            return router;
        };
        this.mount = mount;
        this.service = new service_1.service(this.name);
        return this.create();
    }
}
exports.router = router;
