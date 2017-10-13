"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class module {
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
            state: this._state,
            actions: this._actions,
            mutations: this._mutations,
            getters: this._getters,
        };
    }
}
exports.module = module;
