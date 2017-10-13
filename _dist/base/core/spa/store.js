"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
class base {
    constructor() {
        let self = this;
        let member = {};
        Object.keys(self).forEach(function (key) {
            if (key.substring(0, 1) !== "_") {
                state[key] = self[key];
            }
        });
        return state;
    }
}
class state extends base {
}
exports.state = state;
class actions extends base {
}
exports.actions = actions;
class mutations extends base {
}
exports.mutations = mutations;
class store {
    constructor(state, actions, mutations) {
        this.store = () => {
            let vuex = {
                state: this.state,
                actions: this.actions,
                mutations: this.mutations
            };
            return new vuex_1.default.Store(vuex);
        };
        this.state = state;
        this.actions = actions;
        this.mutations = mutations;
    }
}
exports.store = store;
