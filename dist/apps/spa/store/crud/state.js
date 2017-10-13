"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class state extends state_1.state {
    constructor(options) {
        super();
        this.mount = "";
        this.entities = [];
        this.entity = {};
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
        this.mount = options.endPoint;
    }
}
exports.state = state;
