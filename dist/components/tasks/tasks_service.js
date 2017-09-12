"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_base_1 = require("../service_base");
class tasks_service extends service_base_1.service_base {
    constructor(name) {
        super(name);
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.page = req.params.page;
            search.limit = 10;
            search.append("title", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.tasks_service = tasks_service;
