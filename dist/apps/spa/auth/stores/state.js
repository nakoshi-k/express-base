"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../../base/spa/stores/state");
class state extends state_1.state {
    constructor(options) {
        super();
        this.user = {
            name: "login yet"
        };
    }
}
exports.state = state;
