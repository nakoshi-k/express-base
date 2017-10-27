"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation = () => Promise.resolve().then(function () { return require('../navigation/components/navigation.vue'); });
const sub = () => Promise.resolve().then(function () { return require('./components/sub.vue'); });
const idx = () => Promise.resolve().then(function () { return require('./components/idx.vue'); });
const add = () => Promise.resolve().then(function () { return require('./components/add.vue'); });
const view = () => Promise.resolve().then(function () { return require('./components/view.vue'); });
const edit = () => Promise.resolve().then(function () { return require('./components/edit.vue'); });
const login = () => Promise.resolve().then(function () { return require('./components/login.vue'); });
const mount = "/users";
exports.default = [
    { name: "users_login", path: `${mount}/login`, components: { single: login } },
    { name: "users_page", path: `${mount}/page/:page*`, components: { main: idx, navi: navigation, sub: sub } },
    { name: "users_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "users_add", path: `${mount}/add`, components: { main: add, navi: navigation, sub: sub } },
    { name: "users_view", path: `${mount}/:id`, components: { main: view, navi: navigation, sub: sub } },
    { name: "users_edit", path: `${mount}/:id/edit`, components: { main: edit, navi: navigation, sub: sub } },
];
