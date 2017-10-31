"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_service_1 = require("../../apps_service");
class service extends apps_service_1.service {
    constructor(name) {
        super(name);
        this.name = "groups";
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 10;
            search.page = req.params.page;
            search.append("id", search.like("%{word}%"));
            search.append("name", search.like("%{word}%"));
            search.append("created_at", search.like("%{word}%"));
            search.append("updated_at", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.service = service;
