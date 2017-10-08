"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
vue_1.default.use(vue_router_1.default);
const main_vue_1 = require("../vue/main.vue");
const index_vue_1 = require("../vue/index.vue");
const add_vue_1 = require("../vue/add.vue");
const view_vue_1 = require("../vue/view.vue");
const edit_vue_1 = require("../vue/edit.vue");
let name = "tasks";
const routes = [
    { path: '/tasks/',
        components: { default: index_vue_1.default }
    },
    { path: '/tasks/page/:page/',
        components: { default: index_vue_1.default }
    },
    { path: '/tasks/add',
        components: { default: add_vue_1.default }
    },
    { path: '/tasks/:id',
        components: { default: view_vue_1.default }
    },
    { path: '/tasks/:id/edit',
        components: { default: edit_vue_1.default }
    }
];
const router = new vue_router_1.default({
    mode: 'history',
    routes: routes
});
const app = new vue_1.default({
    router,
    template: "<tasks-main></tasks-main>",
    components: { "tasks-main": main_vue_1.default }
}).$mount('#application');
exports.render = app;
