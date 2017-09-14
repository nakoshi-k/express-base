"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class config {
    constructor() {
        this._sep = "";
        let path = require("path");
        this._sep = path.sep;
    }
    get sep() {
        return this._sep;
    }
}
exports.config = config;
