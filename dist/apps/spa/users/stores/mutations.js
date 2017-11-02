"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../../../../core/spa/stores/mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setEntities = (state, paginate) => {
            state.entities = paginate[this._resource];
            state.page = paginate.page;
        };
        this.setEntity = (state, entity) => {
            if (this.isServer()) {
                entity = JSON.parse(JSON.stringify(entity));
            }
            for (let k in entity) {
                if (typeof entity[k] === "string") {
                    state.entity[k] = entity[k];
                    continue;
                }
                if (typeof entity[k] === "object" && typeof state.entity[k] === "object") {
                    state.entity[k] = Object.assign(state.entity[k], entity[k]);
                }
            }
        };
        this.updateEntity = (state, kv) => {
            let key = kv.key;
            let value = kv.value;
            if (key.indexOf(".") > -1) {
                let sp = key.split(".");
                key = sp.shift();
                for (let i = 0; i < sp.length; i++) {
                    let ne = {};
                    ne[sp[i]] = value;
                    value = ne;
                }
            }
            //state.entity[ key ] = value
            if (typeof value === "object") {
                state.entity[key] = Object.assign(state.entity[key], value);
                return;
            }
            state.entity[key] = value;
        };
        this.setClearEntity = (state) => {
            let entity = state.entity;
            for (let key in entity) {
                entity[key] = null;
                if (key === "id" || key === "created_at" || key === "updated_at") {
                    delete entity[key];
                }
                if (key === "errors") {
                    entity[key] = [];
                }
            }
        };
        this.setErrors = (state, errors) => {
            state.entity["errors"] = errors;
        };
        this._mount = options.mount;
        this._resource = options.resource;
    }
}
exports.mutations = mutations;
