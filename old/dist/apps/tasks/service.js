"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../service");
class service extends service_1.service {
    constructor(name) {
        super(name);
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 5;
            search.page = req.params.page;
            search.append("title", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.service = service;
