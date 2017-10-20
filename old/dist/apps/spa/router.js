"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const navi_vue_1 = require("./components/navi.vue");
const sub_vue_1 = require("./components/sub.vue");
const page_vue_1 = require("./components/tasks/page.vue");
const add_vue_1 = require("./components/tasks/add.vue");
const view_vue_1 = require("./components/tasks/view.vue");
const edit_vue_1 = require("./components/tasks/edit.vue");
const interface_1 = require("./interface/interface");
vue_1.default.use(vue_router_1.default);
function createRouter(options = interface_1.createOptions) {
    let opt = options;
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            { name: "page", path: `/${opt.entities}/page/:page*`, components: { main: page_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "index", path: `/${opt.entities}/page/1`, alias: `/${opt.entities}/` },
            { name: "add", path: `/${opt.entities}/add`, components: { main: add_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "view", path: `/${opt.entities}/:id`, components: { main: view_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
            { name: "edit", path: `/${opt.entities}/:id/edit`, components: { main: edit_vue_1.default, navi: navi_vue_1.default, sub: sub_vue_1.default } },
        ]
    });
}
exports.createRouter = createRouter;
