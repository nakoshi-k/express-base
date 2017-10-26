"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_module_1 = require("../../../base/spa/stores/store_module");
const mutations_1 = require("./stores/mutations");
const actions_1 = require("./stores/actions");
const state_1 = require("./stores/state");
const getters_1 = require("./stores/getters");
class store_module extends store_module_1.store_module {
    constructor(feeds) {
        super();
        this.state = new state_1.state(feeds).map("all");
        this.actions = new actions_1.actions(feeds).map("all");
        this.mutations = new mutations_1.mutations(feeds).map("all");
        let lgetters = new getters_1.getters(feeds).map("all");
        this.getters = Object.assign({}, lgetters, { feeds: function () { return feeds; } });
    }
}
exports.store_module = store_module;
