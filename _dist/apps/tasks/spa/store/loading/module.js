"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_module_1 = require("../vue_module");
const mutations_1 = require("./mutations");
const actions_1 = require("./actions");
const state_1 = require("./state");
const getters_1 = require("./getters");
let mod = new vue_module_1.vue_module();
mod.state = new state_1.state().map("all");
mod.actions = new actions_1.actions().map("all");
mod.mutations = new mutations_1.mutations().map("all");
mod.getters = new getters_1.getters().map("all");
class vue_module extends vue_module_1.vue_module {
    constructor(config) {
        super();
        this.state = new state_1.state().map("all");
        this.actions = new actions_1.actions().map("all");
        this.mutations = new mutations_1.mutations().map("all");
        this.getters = new getters_1.getters().map("all");
    }
}
exports.vue_module = vue_module;
exports.default = mod.create();
