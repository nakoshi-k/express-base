"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../../core/spa/stores/state");
class state extends state_1.state {
    constructor(options) {
        super();
        this.close = false;
        this.show = false;
        this.template = "";
    }
}
exports.state = state;
