"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./vue/App.vue");
const router_1 = require("./router");
function createApp() {
    const router = router_1.createRouter();
    const app = new vue_1.default({
        router,
        render: h => h(App_vue_1.default)
    });
    return { app, router };
}
exports.createApp = createApp;
