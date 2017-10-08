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
        tasks: [],
        task: {},
    };
    let actions = {
        fetchEntities: ({ commit }, query = { page: 1, search: "" }) => {
            return api.paginate(query).then((paginate) => {
                commit("setEntities", paginate);
            });
        }
    };
    let mutations = {
        setEntities: (state, paginate) => {
            state.tasks = paginate.tasks;
            state.page = paginate.page;
        },
    };
    let getters = {
        domain: (state) => {
            return state.domain;
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
