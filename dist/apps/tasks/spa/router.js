"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Navi_vue_1 = require("./vue/Navi.vue");
const Page_vue_1 = require("./vue/Page.vue");
const Interface_1 = require("./Interface");
vue_1.default.use(vue_router_1.default);
function createRouter(options = Interface_1.createOptions) {
    let opt = options;
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            { path: `/${opt.entities}/`, components: { main: Page_vue_1.default, navi: Navi_vue_1.default } },
            { path: `/${opt.entities}/:id`, components: { main: Page_vue_1.default, navi: Navi_vue_1.default } },
        ]
    });
}
exports.createRouter = createRouter;
