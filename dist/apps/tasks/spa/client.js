"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const app_vue_1 = require("./vue/app.vue");
//Vue.config.productionTip = false
new vue_1.default({
    el: '#application',
    template: '<App/>',
    components: { app: app_vue_1.default }
});
