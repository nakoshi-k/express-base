"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../../core/spa/stores/state");
class state extends state_1.state {
    constructor(options) {
        super();
        this.overLay = false;
        this.loading = false;
        this.indicator = {
            show: false,
            status: "success",
            complate: 0,
            prosess: true
        };
    }
}
exports.state = state;
