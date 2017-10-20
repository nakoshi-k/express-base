"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class state extends state_1.state {
    constructor(ssr) {
        super(ssr);
        this.entities = [];
        this.entity = {};
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
    }
}
exports.state = state;
