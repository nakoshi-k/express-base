"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./vue/App.vue");
const router_1 = require("./router");
const router = router_1.createRouter();
const app = new vue_1.default({
    router,
    components: { App: App_vue_1.default }
});
app.$mount("#application");
