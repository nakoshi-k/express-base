"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../../core/spa/stores/state");
class state extends state_1.state {
    constructor(options) {
        super();
        this.mount = "";
        this.association = {
            hasMany: ["user_profiles"],
            belongsTo: ["groups"]
        };
        this.entities = [];
        this.entity = {
            group: {
                id: null
            },
            user_profile: {
                id: null
            }
        };
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
        this.mount = options.resource;
    }
}
exports.state = state;
