"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global = require("../spa/components/global");
const sub_vue_1 = require("./components/sub.vue");
const idx_vue_1 = require("./components/idx.vue");
const add_vue_1 = require("./components/add.vue");
const view_vue_1 = require("./components/view.vue");
const edit_vue_1 = require("./components/edit.vue");
const login_vue_1 = require("./components/login.vue");
let mount = "/users";
exports.default = [
    { name: "users_page", path: `${mount}/page/:page*`, components: { main: idx_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "users_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "users_add", path: `${mount}/add`, components: { main: add_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "users_login", path: `${mount}/login`, components: { single: login_vue_1.default } },
    { name: "users_view", path: `${mount}/:id`, components: { main: view_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "users_edit", path: `${mount}/:id/edit`, components: { main: edit_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
];
