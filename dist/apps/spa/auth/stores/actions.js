"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../../base/spa/stores/actions");
const auth_1 = require("../../../resources/auth");
let auth_api = new auth_1.auth();
class actions extends actions_1.actions {
    constructor(options) {
        super();
        this.fetchAuthUser = ({ commit, getters, state }) => {
            return auth_api.user().then(r => {
                commit("setAuthUser", r);
            });
        };
        this.logout = ({ commit, getters, state }) => {
            return auth_api.logout().then(r => {
                commit("restAuthUser");
            });
        };
    }
}
exports.actions = actions;
