"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const app_vue_1 = require("./vue/app.vue");
const router_1 = require("./router");
//Vue.config.productionTip = false
new vue_1.default({
    el: '#application',
    router: router_1.default,
    template: '<App/>',
    components: { app: app_vue_1.default }
});
