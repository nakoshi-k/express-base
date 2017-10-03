"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Hello_vue_1 = require("./vue/Hello.vue");
vue_1.default.use(vue_router_1.default);
function createRouter() {
    return new vue_router_1.default({
        routes: [
            { path: '/', name: 'hello', component: Hello_vue_1.default }
        ]
    });
}
exports.createRouter = createRouter;
