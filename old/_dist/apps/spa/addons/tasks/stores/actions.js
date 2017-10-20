"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../stores/actions");
class actions extends actions_1.actions {
    constructor(options) {
        super();
        this.fetchEntities = ({ commit, getters }, route) => {
            let api = getters.api;
            return api.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit, getters }, route) => {
            let api = getters.api;
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.copyEntity = ({ commit, getters }, copy) => {
            let api = getters.api;
            let route = {
                params: {
                    id: copy.id,
                },
                path: copy.mount + "/" + copy.id,
            };
            return api.entity(route).then((entity) => {
                for (let key in entity) {
                    if (key === "id" || key === "updated_at" || key === "created_at") {
                        delete entity[key];
                    }
                }
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ state, commit, getters }, token) => {
            let api = getters.api;
            return api.insert(state.entity, state.mount, token);
        };
        this.saveEntity = ({ state, commit, getters }, token) => {
            let api = getters.api;
            return api.update(state.entity, state.mount, token);
        };
        this.deleteEntity = ({ state, commit, getters }, delObj) => {
            let api = getters.api;
            return api.delete(delObj.id, delObj.mount, delObj.token);
        };
        this.clearEntity = ({ commit }) => {
            return Promise.resolve(commit("setClearEntity"));
        };
    }
}
exports.actions = actions;
