"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_service_1 = require("../../apps_service");
class service extends apps_service_1.service {
    constructor(name) {
        super(name);
        this.name = "tasks";
        this.get_entity = (id, includes = {}) => {
            return this.parent.get_entity(id);
        };
        this.pagination = (req, res = { locals: {} }) => {
            return this.parent.pagination(req, res);
        };
        this.save_entity = (newData) => {
            return this.parent.save_entity(newData);
        };
        this.update_entity = (id, newData) => {
            return this.parent.update_entity(id, newData);
        };
        this.delete_entity = (id) => {
            return this.parent.delete_entity(id);
        };
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
        this.name = name;
    }
}
exports.service = service;
