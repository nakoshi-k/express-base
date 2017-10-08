"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
class state {
    constructor() {
        let self = this;
        let state = {};
        Object.keys(self).forEach(function (key) {
            state[key] = self[key];
        });
        return state;
    }
}
exports.state = state;
class actions {
    constructor() {
        let self = this;
        let actions = {};
        Object.keys(self).forEach(function (key) {
            state[key] = self[key];
        });
        return actions;
    }
}
exports.actions = actions;
class mutations {
    constructor() {
        let self = this;
        let mutations = {};
        Object.keys(self).forEach(function (key) {
            state[key] = self[key];
        });
        return {};
    }
}
exports.mutations = mutations;
class store {
    constructor() {
        this.store = () => {
            let vuex = {
                state: this.state,
                actions: this.actions,
                mutations: this.mutations
            };
            return new vuex_1.default.Store(vuex);
        };
    }
}
exports.store = store;
