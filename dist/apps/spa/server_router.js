"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_router_1 = require("../apps_router");
const path = require("path");
const Vue = require("vue");
const Router = require("vue-router");
Vue.use(Router);
const VueRender = require("vue-server-renderer");
const serialize = require("serialize-javascript");
const feeds_1 = require("../resources/feeds");
const bundle_server_1 = require("./bundle-server");
class router extends apps_router_1.router {
    constructor() {
        super();
        this.name = "spa";
        this.parent = {};
        this.mount = "/";
        this._mapping = {
            idx: { type: "get", mount: "/*", component: "view", middle_ware: null },
        };
        this.app = (context) => {
            let server = bundle_server_1.default;
            let app = (resolve, reject) => {
                server(context).then((app) => resolve(app)).catch(e => reject(e));
            };
            return new Promise(app);
        };
        this.appRender = (app) => {
            const renderer = VueRender.createRenderer();
            let state = `<script>window.__INITIAL_STATE__=${serialize(app.$store.state, { isJSON: true })}</script>`;
            let appRender = (resolve, reject) => {
                renderer.renderToString(app, (err, html) => {
                    if (err) {
                        if (err.code === 404) {
                            reject(404);
                        }
                        reject(500);
                        return;
                    }
                    let response = {
                        html: html + state,
                        state: state,
                        title: "title",
                        meta: "",
                        description: ""
                    };
                    resolve(response);
                });
            };
            return new Promise(appRender);
        };
        this.view = (req, res, next) => {
            const context = {
                url: req.url,
                feeds: new feeds_1.feeds()
            };
            let dir = path.resolve([__dirname, "..", "views"].join(path.sep));
            this.renderer.views = { common: dir, typical: dir };
            let rend = this.renderer.create(res);
            this.ssr(context).then(ssrr => {
                rend.set_vars({
                    title: ssrr.title,
                    meta: ssrr.meta,
                    description: ssrr.description,
                    ssr: ssrr.html
                });
                rend.render("view");
            }).catch(err => {
                if (err.code == 404) {
                    rend.status(404);
                }
                if (res.app.get('env') === 'development') {
                    rend.set_vars({
                        code: err.code,
                        message: err.message,
                        error: err
                    });
                    rend.render('error');
                    return;
                }
                rend.set_vars({
                    message: err.code + " " + err.message,
                    error: null
                });
                rend.render('error');
            });
        };
    }
    async ssr(context) {
        let app = await this.app(context);
        let render = await this.appRender(app);
        return render;
    }
}
exports.router = router;
