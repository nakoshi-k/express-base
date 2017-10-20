"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Navi_vue_1 = require("./components/Navi.vue");
const Page_vue_1 = require("./components/tasks/Page.vue");
const Sub_vue_1 = require("./components/Sub.vue");
const Add_vue_1 = require("./components/tasks/Add.vue");
const View_vue_1 = require("./components/tasks/View.vue");
const Edit_vue_1 = require("./components/tasks/Edit.vue");
const Interface_1 = require("./Interface");
vue_1.default.use(vue_router_1.default);
function createRouter(options = Interface_1.createOptions) {
    let opt = options;
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            { name: "page", path: `/${opt.entities}/page/:page*`, components: { main: Page_vue_1.default, navi: Navi_vue_1.default, sub: Sub_vue_1.default } },
            { name: "index", path: `/${opt.entities}/page/1`, alias: `/${opt.entities}/` },
            { name: "add", path: `/${opt.entities}/add`, components: { main: Add_vue_1.default, navi: Navi_vue_1.default, sub: Sub_vue_1.default } },
            { name: "view", path: `/${opt.entities}/:id`, components: { main: View_vue_1.default, navi: Navi_vue_1.default, sub: Sub_vue_1.default } },
            { name: "edit", path: `/${opt.entities}/:id/edit`, components: { main: Edit_vue_1.default, navi: Navi_vue_1.default, sub: Sub_vue_1.default } },
        ]
    });
}
exports.createRouter = createRouter;
