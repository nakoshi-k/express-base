"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../../core/spa/stores/actions");
class actions extends actions_1.actions {
    constructor(feeds) {
        super();
        this.fetchEntities = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.copyEntity = ({ commit, getters, state }, copy) => {
            let route = {
                params: {
                    id: copy.id,
                },
                path: copy.mount + "/" + copy.id,
            };
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                for (let key in entity) {
                    if (key === "id" || key === "updated_at" || key === "created_at") {
                        delete entity[key];
                    }
                }
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.insert(state.entity, token);
        };
        this.saveEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            if (state.entity.new_password === "") {
                delete state.entity.new_password;
            }
            if (state.entity.confirm_password === "") {
                delete state.entity.confirm_password;
            }
            return crud.update(state.entity, token);
        };
        this.deleteEntity = ({ state, commit, getters }, delObj) => {
            let crud = getters.crud;
            return crud.delete(delObj.id, delObj.token);
        };
        this.clearEntity = ({ commit }) => {
            return Promise.resolve(commit("setClearEntity"));
        };
    }
}
exports.actions = actions;
