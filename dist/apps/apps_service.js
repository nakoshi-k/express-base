"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_service_1 = require("../core/core_service");
const authorization_1 = require("./lib/authorization");
class service extends core_service_1.core_service {
    constructor(name) {
        super(name);
        /* auth */
        this.auth = new authorization_1.authorization();
        /* activate local */
        this.auth.local();
    }
}
exports.service = service;
