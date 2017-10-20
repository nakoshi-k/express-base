"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class state extends state_1.state {
    constructor() {
        super(...arguments);
        this.close = false;
        this.show = false;
        this.template = "";
        this.data = {
            id: "",
            name: ""
        };
    }
}
exports.state = state;
