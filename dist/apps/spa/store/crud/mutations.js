"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../mutations");
class mutations extends mutations_1.mutations {
    constructor(ssr) {
        super(ssr);
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
        this._entities = ssr.entities;
        this._entity = ssr.entity;
    }
}
exports.mutations = mutations;
