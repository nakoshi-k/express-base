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
        this.setClearEntity = (state) => {
            let entity = state.entity;
            for (let key in entity) {
                entity[key] = null;
                if (key === "id" || key === "created_at" || key === "updated_at") {
                    delete entity[key];
                }
            }
        };
        this._mount = options.mount;
        this._entities = options.entities;
    }
}
exports.mutations = mutations;
