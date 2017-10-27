"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
const store_module_1 = require("./loading/store_module");
const store_module_2 = require("./modal/store_module");
const store_module_3 = require("./offset/store_module");
const store_module_4 = require("./tasks/store_module");
const store_module_5 = require("./users/store_module");
const store_module_6 = require("./auth/store_module");
function createStore(feeds) {
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
    let tasks = new store_module_4.store_module({ resource: "tasks", endPoint: "/api/tasks", feeds: feeds }).store();
    let users = new store_module_5.store_module({ resource: "users", endPoint: "/api/users", feeds: feeds }).store();
    let auth = new store_module_6.store_module({ feeds: feeds }).store();
    let loading = new store_module_1.store_module({ feeds: feeds }).store();
    let modal = new store_module_2.store_module({ feeds: feeds }).store();
    let offset = new store_module_3.store_module({ feeds: feeds }).store();
    let vuex = {
        getters: getters,
        modules: {
            "tasks": tasks,
            "loading": loading,
            "modal": modal,
            "users": users,
            "auth": auth,
            "offset": offset
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
