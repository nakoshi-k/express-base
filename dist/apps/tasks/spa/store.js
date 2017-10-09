"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
const api_1 = require("./api");
const Interface_1 = require("./Interface");
vue_1.default.use(vuex_1.default);
function createStore(options = Interface_1.createOptions) {
    let api = new api_1.Internal({
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        server: { request: options.server.request },
    });
    let state = {
        domain: options.entities,
        orverLay: true,
        indicator: {
            status: true,
            complate: 0
        },
        tasks: [],
        task: {},
        page: {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        }
    };
    let actions = {
        fetchEntities: ({ commit }, route) => {
            return api.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        },
        fetchEntity: ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        },
        insertEntity: ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        },
        saveEntity: ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        },
    };
    let mutations = {
        setEntities: (state, paginate) => {
            state.tasks = paginate.tasks;
            state.page = paginate.page;
        },
        setEntity: (state, entity) => {
            state.task = entity;
        },
        updateEntity: (state, kv) => {
            state.task[kv.key] = kv.value;
        }
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
        actions: actions,
        mutations: mutations,
        getters: getters
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
