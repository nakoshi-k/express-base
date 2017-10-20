"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_service_1 = require("../api_service");
class service extends api_service_1.api_service {
    constructor(name) {
        super(name);
        this.name = "tasks";
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 10;
            search.page = req.params.page;
            search.append("id", search.like("%{word}%"));
            search.append("title", search.like("%{word}%"));
            search.append("priod", search.like("%{word}%"));
            search.append("created_at", search.like("%{word}%"));
            search.append("updated_at", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.service = service;
