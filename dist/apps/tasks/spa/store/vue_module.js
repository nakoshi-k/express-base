"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class vue_module {
    constructor(ssr) {
    }
    set state(state) {
        this._state = state;
    }
    set actions(actions) {
        this._actions = actions;
    }
    set mutations(mutations) {
        this._mutations = mutations;
    }
    set getters(getters) {
        this._getters = getters;
    }
    create() {
        return {
            namespaced: true,
            state: this._state,
            actions: this._actions,
            mutations: this._mutations,
            getters: this._getters,
        };
    }
    store() {
        return {
            namespaced: true,
            state: this._state,
            actions: this._actions,
            mutations: this._mutations,
            getters: this._getters,
        };
    }
}
exports.vue_module = vue_module;
