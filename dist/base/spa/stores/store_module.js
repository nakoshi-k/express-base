"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class store_module {
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
exports.store_module = store_module;
