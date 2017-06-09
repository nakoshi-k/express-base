"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class helper_base {
    constructor() {
        this.load = (name) => {
            this[name] = require("./" + name + "_helper");
        };
    }
}
exports.helper_base = helper_base;
