"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
const api_1 = require("./api");
const Interface_1 = require("./Interface");
vue_1.default.use(vuex_1.default);
let increment = (state) => {
    state.count++;
};
let b;
function createStore(options = Interface_1.createOptions) {
    let api = new api_1.Internal({
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        request: options.request
    });
    return new vuex_1.default.Store({
        state: {},
        actions: {
            fetchEntities({ commit }, query = { page: 1, search: "" }) {
                return api.entities(query).then((entities) => {
                    commit("setEntities", entities);
                });
            }
        },
        mutations: {
            setEntities: (state, entities) => {
                let tasks = entities.tasks;
                state["tasks"] = entities.tasks;
                state["page"] = entities.page;
            },
        }
    });
}
exports.createStore = createStore;
