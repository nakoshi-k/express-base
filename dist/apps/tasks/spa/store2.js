"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_store = require("./base_store");
class actions extends base_store.actions {
}
class mutations extends base_store.mutations {
}
class state extends base_store.state {
}
class store extends base_store.store {
    constructor() {
        super();
        this.state = new state();
        this.actions = new actions();
        this.mutations = new mutations();
    }
}
exports.store = store;
