"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../../base/spa/stores/state");
class state extends state_1.state {
    constructor(feeds) {
        super();
        this.feeds = {};
        this.auth_status = false;
        this.user = {
            id: "",
            name: "",
            mail: ""
        };
        this.feeds = feeds;
    }
}
exports.state = state;
