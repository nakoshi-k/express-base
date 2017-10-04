"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
function createStore() {
    return new vuex_1.default.Store({
        state: {
            count: 0
        },
        mutations: {
            increment(state) {
                state.count++;
            }
        }
    });
}
exports.createStore = createStore;
