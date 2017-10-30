"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_vue_1 = require("../navigation/components/navigation.vue");
const sub_vue_1 = require("./components/sub.vue");
const idx_vue_1 = require("./components/idx.vue");
const add_vue_1 = require("./components/add.vue");
const view_vue_1 = require("./components/view.vue");
const edit_vue_1 = require("./components/edit.vue");
let mount = "/groups";
exports.default = [
    { name: "groups_page", path: `${mount}/page/:page*`, components: { main: idx_vue_1.default, navi: navigation_vue_1.default, sub: sub_vue_1.default } },
    { name: "groups_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "groups_add", path: `${mount}/add`, components: { main: add_vue_1.default, navi: navigation_vue_1.default, sub: sub_vue_1.default } },
    { name: "groups_view", path: `${mount}/:id`, components: { main: view_vue_1.default, navi: navigation_vue_1.default, sub: sub_vue_1.default } },
    { name: "groups_edit", path: `${mount}/:id/edit`, components: { main: edit_vue_1.default, navi: navigation_vue_1.default, sub: sub_vue_1.default } },
];
