"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_module_1 = require("../vue_module");
const mutations_1 = require("./mutations");
const actions_1 = require("./actions");
const state_1 = require("./state");
const getters_1 = require("./getters");
class vue_module extends vue_module_1.vue_module {
    constructor(ssr) {
        super(ssr);
        this.state = new state_1.state(ssr).map("all");
        this.actions = new actions_1.actions(ssr).map("all");
        this.mutations = new mutations_1.mutations(ssr).map("all");
        this.getters = new getters_1.getters(ssr).map("all");
    }
}
exports.vue_module = vue_module;
