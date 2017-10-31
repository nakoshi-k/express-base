"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
class pagination extends middleware_1.middleware {
    constructor() {
        super(...arguments);
        this.mw = (req, res, next) => {
        };
        this.create = () => {
            return this.mw;
        };
    }
}
exports.pagination = pagination;
