"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global = require("../../components/global");
const sub_vue_1 = require("./components/sub.vue");
const idx_vue_1 = require("./components/idx.vue");
const add_vue_1 = require("./components/add.vue");
const view_vue_1 = require("./components/view.vue");
const edit_vue_1 = require("./components/edit.vue");
let mount = "/tasks";
exports.default = [
    { name: "tasks_page", path: `${mount}/page/:page*`, components: { main: idx_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "tasks_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "tasks_add", path: `${mount}/add`, components: { main: add_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "tasks_view", path: `${mount}/:id`, components: { main: view_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
    { name: "tasks_edit", path: `${mount}/:id/edit`, components: { main: edit_vue_1.default, navi: global.navi, sub: sub_vue_1.default } },
];
