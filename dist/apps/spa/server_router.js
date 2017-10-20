"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(mount) {
        super(mount);
        this.name = "spa";
        this.parent = {};
        this.mount = "/";
        this.app = (context) => {
            let server = bundle_server_1.default;
            let app = (resolve, reject) => {
                server(context).then((app) => resolve(app)).catch(e => reject(e));
            };
            return new Promise(app);
        };
        this.appRender = (app) => {
            const renderer = VueRender.createRenderer();
            let stateTag = `<script>window.__INITIAL_STATE__=${serialize(app.$store.state, { isJSON: true })}</script>`;
            let appRender = (resolve, reject) => {
                renderer.renderToString(app, (err, html) => {
                    if (err) {
                        if (err.code === 404) {
                            reject(404);
                        }
                        reject(500);
                        return;
                    }
                    resolve(html + stateTag);
                });
            };
            return new Promise(appRender);
        };
        this.view = (req, res, next) => {
            const context = {
                url: req.url,
                feeds: new feeds_1.feeds()
            };
            this.ssr(context).then(ssr => {
                this.setData({ ssr: ssr });
                let d = path.resolve(__dirname + path.sep + ".." + path.sep + "views");
                this.render(req, res, d + path.sep + "view");
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
        this.beforeRender = (req, res) => {
            this.csrfReady(req);
        };
        this.bind = (router) => {
            let csrfProtection = this.csrfProtection;
            let auth = this.isAuthenticated;
            let map = [csrfProtection];
            router.get("*", ...map, this.view);
            return router;
        };
        this.mount = mount;
        return this.create();
    }
    ssr(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let app = yield this.app(context);
            let render = yield this.appRender(app);
            return render;
        });
    }
}
exports.router = router;
