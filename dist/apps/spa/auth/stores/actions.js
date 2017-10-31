"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../../core/spa/stores/actions");
class actions extends actions_1.actions {
    constructor(options) {
        super();
        this.fetchAuthUser = ({ commit, getters, state }) => {
            let api = getters.api;
            return api.user().then(r => {
                commit("setAuthUser", r);
            }).catch(e => {
                console.log(e);
                return Promise.resolve();
            });
        };
        this.logout = ({ commit, getters, state }) => {
            let api = getters.api;
            return api.logout().then(r => {
                commit("restAuthUser");
            });
        };
    }
}
exports.actions = actions;
