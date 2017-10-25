"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const authorization_1 = require("./lib/authorization");
class service extends core_1.service {
    constructor(name) {
        super(name);
        this.name = "service";
        /* auth */
        this.auth = new authorization_1.authorization();
        /* activate local */
        this.auth.local();
    }
}
exports.service = service;
