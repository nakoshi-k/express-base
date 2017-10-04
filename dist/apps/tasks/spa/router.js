"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Navi_vue_1 = require("./vue/Navi.vue");
const Resource_vue_1 = require("./vue/Resource.vue");
vue_1.default.use(vue_router_1.default);
function createRouter() {
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            { path: '/tasks/', components: { default: Resource_vue_1.default, navi: Navi_vue_1.default } },
            { path: '/tasks/:id', components: { default: Resource_vue_1.default, navi: Navi_vue_1.default } },
        ]
    });
}
exports.createRouter = createRouter;
