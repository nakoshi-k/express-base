"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_module_1 = require("../store_module");
const mutations_1 = require("./mutations");
const actions_1 = require("./actions");
const state_1 = require("./state");
const getters_1 = require("./getters");
class store_module extends vue_module_1.store_module {
    constructor(options) {
        super();
        this.state = new state_1.state(options).map("all");
        this.actions = new actions_1.actions(options).map("all");
        this.mutations = new mutations_1.mutations(options).map("all");
        this.getters = new getters_1.getters(options).map("all");
    }
}
exports.store_module = store_module;
