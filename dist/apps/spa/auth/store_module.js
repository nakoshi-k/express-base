"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_module_1 = require("../../../base/spa/stores/store_module");
const mutations_1 = require("./stores/mutations");
const actions_1 = require("./stores/actions");
const state_1 = require("./stores/state");
const getters_1 = require("./stores/getters");
class store_module extends store_module_1.store_module {
    constructor(options) {
        super();
        this.state = new state_1.state(options).map("all");
        this.actions = new actions_1.actions(options).map("all");
        this.mutations = new mutations_1.mutations(options).map("all");
        this.getters = new getters_1.getters(options).map("all");
    }
}
exports.store_module = store_module;
