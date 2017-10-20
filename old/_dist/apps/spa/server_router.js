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
const path = require("path");
const core_1 = require("../../base/core");
const Vue = require("vue");
Vue.use(Router);
const Router = require("vue-router");
const serialize = require("serialize-javascript");
const VueRender = require("vue-server-renderer");
const bundle_server_1 = require("../spa/bundle-server");
const server_feed_1 = require("./server_feed");
class server_router extends core_1.router {
    constructor(mount) {
        super(mount);
        this.mount = "/";
        this.name = "spa";
        this.vueCreate = (context) => {
            let server = bundle_server_1.default;
            let ssr = (resolve, reject) => {
                server(context).then((app) => {
                    resolve(app);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(ssr);
        };
        this.vueToString = (app) => {
            const renderer = VueRender.createRenderer();
            let stateTag = `<script>window.__INITIAL_STATE__=${serialize(app.$store.state, { isJSON: true })}</script>`;
            let vueRender = (resolve, reject) => {
                renderer.renderToString(app, (err, html) => {
                    if (err) {
                        if (err.code === 404) {
                            reject(404);
                            return;
                        }
                        reject(500);
                        return;
                    }
                    resolve(html + stateTag);
                });
            };
            return new Promise(vueRender);
        };
        this.view = (req, res, next) => {
            const context = {
                url: `${this.mount}${req.url}`,
                server: {
                    server_feed: new server_feed_1.server_feed(),
                    mount: this.mount
                }
            };
            this.ssr(context).then(ssr => {
                let ds = path.sep;
                let viewDir = path.resolve(`${__dirname}${ds}views${ds}spa`);
                this.setData({ ssr: ssr });
                this.render(req, res, viewDir);
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
        this.bind = (router) => {
            router.get("/^(api).*", this.view);
            return router;
        };
        this.mount = mount;
        return this.create();
    }
    ssr(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let app = yield this.vueCreate(context);
            let source = yield this.vueToString(app);
            return source;
        });
    }
}
exports.server_router = server_router;
