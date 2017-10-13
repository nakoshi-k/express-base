"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const navi_vue_1 = require("./components/navi.vue");
const sub_vue_1 = require("./components/sub.vue");
const page_vue_1 = require("../tasks/components/page.vue");
const add_vue_1 = require("../tasks/components/add.vue");
const view_vue_1 = require("../tasks/components/view.vue");
const edit_vue_1 = require("../tasks/components/edit.vue");
vue_1.default.use(vue_router_1.default);
function createRouter() {
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            { name: "page", path: `/tasks/page/:page*`, components: { main: page_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "index", path: `/tasks/page/1`, alias: `/tasks/` },
            { name: "add", path: `/tasks/add`, components: { main: add_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "view", path: `/tasks/:id`, components: { main: view_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "edit", path: `/tasks/:id/edit`, components: { main: edit_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
        ]
    });
}
exports.createRouter = createRouter;
