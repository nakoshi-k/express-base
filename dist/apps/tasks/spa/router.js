"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const hello_vue_1 = require("./vue/hello.vue");
vue_1.default.use(vue_router_1.default);
exports.default = new vue_router_1.default({
    routes: [
        {
            path: '/',
            name: 'hello',
            component: hello_vue_1.default
        }
    ]
});
