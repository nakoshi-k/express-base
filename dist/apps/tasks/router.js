"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const service_1 = require("./service");
const helpers = require("../../base/helper");
const Vue = require("vue");
const Router = require("vue-router");
const Request = require("request");
const serialize = require("serialize-javascript");
Vue.use(Router);
const VueRender = require("vue-server-renderer");
const bundle_server_1 = require("../spa/bundle-server");
class router extends router_1.router {
    constructor() {
        super();
        this.name = "tasks";
        this.beforeRender = (req, res) => {
            this.helper("form", new helpers.form());
            this.helper("pagination", new helpers.pagination());
            this.csrfReady(req);
        };
        this.vue = (req, res, next) => {
            const context = {
                url: `/${this.name}${req.url}`,
                serverOptions: {
                    host: req.protocol + '://' + req.headers.host,
                    entities: this.entities_name,
                    entity: this.entity_name,
                    server: { request: Request }
                }
            };
            this.ssr(context).then(ssr => {
                this.setData({ ssr: ssr });
                this.render(req, res, "vue");
            }).catch(err => {
                if (err.code == 404) {
                    res.status(404);
                }
                res.render('error', {
                    message: err.code,
                    error: {}
                });
            });
        };
        this.search = (req, res, next) => {
            if (!this.isXhr(req)) {
                this.vue(req, res, next);
                return;
            }
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
            if (!this.isXhr(req)) {
                this.vue(req, res, next);
                return;
            }
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
                        res.sendStatus(204);
                    });
                }
                res.sendStatus(500);
            });
        };
        this.insert = (req, res, next) => {
            if (!this.isXhr(req)) {
                this.vue(req, res, next);
                return;
            }
            let entity = this.model.build(req.body);
            entity.save().then((result) => {
                res.status(201);
                res.json(entity.dataValues);
            }).catch((err) => {
                req.body.errors = this.service.validationError(err);
                res.status(400);
                res.json(req.body.errors);
            });
        };
        this.update = (req, res, next) => {
            if (!this.isXhr(req)) {
                this.vue(req, res, next);
                return;
            }
            let model = this.model;
            model.findById(req.params.id).then((entity) => {
                entity.update(req.body).then((result) => {
                    res.status(201);
                    res.json(result);
                }).catch((err) => {
                    res.status(400);
                    res.json(err);
                });
            }).catch((err) => {
                res.status(400);
                res.json(err);
            });
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            router.get("/", csrfProtection, this.search);
            router.get("/page/:page", csrfProtection, this.search);
            router.get("/:id", csrfProtection, this.entity);
            router.get("/*", csrfProtection, this.vue);
            router.post("/", csrfProtection, this.insert);
            router.put("/:id", csrfProtection, this.update);
            router.delete("/:id", csrfProtection, this.delete);
            return router;
        };
        this.service = new service_1.service(this.name);
        return this.create();
    }
    ssr(context) {
        const renderer = VueRender.createRenderer();
        let server = bundle_server_1.default;
        let ssr = (resolve, reject) => {
            server(context).then((app) => {
                let stateTag = `<script>window.__INITIAL_STATE__=${serialize(app.$store.state, { isJSON: true })}</script>`;
                renderer.renderToString(app, (err, html) => {
                    console.log(err);
                    if (err) {
                        if (err.code === 404) {
                            reject(404);
                        }
                        {
                            reject(500);
                        }
                    }
                    resolve(html + stateTag);
                });
            }).catch((err) => {
                reject(err);
            });
        };
        return new Promise(ssr);
    }
}
exports.router = router;
