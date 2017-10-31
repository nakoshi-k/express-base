"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../../../../core/spa/stores/mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setAuthUser = (state, user) => {
            state.auth_status = true;
            state.user = user;
        };
        this.restAuthUser = (state) => {
            state.auth_status = false;
            for (let k in state.user) {
                state.user[k] = null;
            }
        };
    }
}
exports.mutations = mutations;
