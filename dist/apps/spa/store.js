"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
/*
import {createOptionsInterFace,createOptions} from "./interface/interface";
import {vue_module as loading_module } from './store/loading/vue_module';
import {vue_module as modal_module } from './store/modal/vue_module';
import {vue_module as crud_module } from './store/crud/vue_module';
import {vue_module as offset_module } from './store/offset/vue_module';
*/
const store_module_1 = require("./tasks/store_module");
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
    let tasks = new store_module_1.store_module(Object.assign({ entities: "tasks", endPoint: "/tasks" }, server)).store();
    /*
    let users = new crud_module({ entities : "users" , endPoint : "/users" , ...server} ).store();
    let loading = new loading_module({server}).store();
    let modal = new modal_module({server}).store();
    let offset = new offset_module({server}).store();
    */
    let vuex = {
        getters: getters,
        modules: {
            "tasks": tasks,
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
