"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../base/core");
class tasks_service extends core_1.service {
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
