"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
const vue_module_1 = require("./store/loading/vue_module");
const vue_module_2 = require("./store/modal/vue_module");
const vue_module_3 = require("./store/crud/vue_module");
function createStore(server) {
    let getters = {
        token: (state) => {
            if (typeof window === "undefined") {
                return "";
            }
            let body = document.getElementsByTagName("body")[0];
            let csrfToken = body.attributes["data-csrf-token"].value;
            return csrfToken;
        }
    };
    let tasks = new vue_module_3.vue_module(Object.assign({ entities: "tasks", endPoint: "/tasks" }, server)).store();
    let loading = new vue_module_1.vue_module({ server }).store();
    let modal = new vue_module_2.vue_module({ server }).store();
    let vuex = {
        getters: getters,
        modules: {
            "loading": loading,
            "modal": modal,
            "tasks": tasks
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
