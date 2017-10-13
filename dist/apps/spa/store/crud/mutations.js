"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setEntities = (state, paginate) => {
            state.entities = paginate[this._entities];
            state.page = paginate.page;
        };
        this.setEntity = (state, response) => {
            state.entity = response;
        };
        this.updateEntity = (state, kv) => {
            state.entity[kv.key] = kv.value;
        };
        this._mount = options.mount;
        this._entities = options.entities;
    }
}
exports.mutations = mutations;
