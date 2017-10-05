"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const service_1 = require("./service");
const helpers = require("../../base/helper");
const Vue = require("vue");
const Router = require("vue-router");
const Request = require("request");
Vue.use(Router);
const VueRender = require("vue-server-renderer");
const bundle_server_1 = require("./bundle-server");
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
                    entities: "tasks",
                    entity: "task",
                    request: Request
                }
            };
            this.ssr(context).then(ssr => {
                this.setData({ ssr: ssr });
                this.render(req, res, "vue");
            }).catch(err => {
                console.log(err);
                if (err === 404) {
                    res.send(404);
                }
                res.send(500);
            });
        };
        this.search = (req, res, next) => {
            const Vue = require('vue');
            const app = new Vue({
                template: `<div>Hello World</div>`
            });
            // ステップ 2: レンダラを作成
            const renderer = require('vue-server-renderer').createRenderer();
            // ステップ 3: Vue インスタンスを HTML に描画
            renderer.renderToString(app, (err, html) => {
                if (err)
                    throw err;
                console.log(html);
                // => <div data-server-rendered="true">hello world</div>
            });
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
                }
                res.sendStatus(500);
            });
        };
        this.insert = (req, res, next) => {
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
            router.get("/page/:page", csrfProtection, this.search);
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
                renderer.renderToString(app, (err, html) => {
                    if (err) {
                        if (err.code === 404) {
                            reject(404);
                        }
                        else {
                            reject(500);
                        }
                    }
                    resolve(html);
                });
            });
        };
        return new Promise(ssr);
    }
}
exports.router = router;
