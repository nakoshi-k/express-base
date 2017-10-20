"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
const interface_1 = require("./interface/interface");
const vue_module_1 = require("./store/loading/store_module");
const vue_module_2 = require("./store/modal/store_module");
const vue_module_3 = require("./store/crud/store_module");
function createStore(options = interface_1.createOptions) {
    let ssr = {
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        server: { request: options.server.request },
    };
    let state = {
        domain: options.entities,
    };
    let getters = {
        domain: (state) => {
            return state.domain;
        },
        token: (state) => {
            if (typeof window === "undefined") {
                return "";
            }
            let body = document.getElementsByTagName("body")[0];
            let csrfToken = body.attributes["data-csrf-token"].value;
            return csrfToken;
        }
    };
    let vuex = {
        state: state,
        getters: getters,
        modules: {
            "loading": new vue_module_1.store_module(ssr).store(),
            "modal": new vue_module_2.store_module(ssr).store(),
            "tasks": new vue_module_3.store_module(ssr).store()
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
