"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const app_vue_1 = require("./vue/app.vue");
const createApp = () => {
    return new vue_1.default({
        render: h => h(app_vue_1.default)
    });
};
exports.apps = createApp;
