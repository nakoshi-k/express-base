"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../../models");
const pagination_1 = require("../../core/lib/pagination");
const validation_1 = require("../../core/lib/validation");
const search_1 = require("../../core/lib/search");
const service_1 = require("../api/tasks/service");
const service_2 = require("../api/users/service");
const service_3 = require("../api/groups/service");
let service = {
    tasks: new service_1.service("tasks"),
    groups: new service_3.service("groups"),
    users: new service_2.service("users")
};
class feeds {
    constructor() {
        this.model = (name) => {
            return this.models[name];
        };
        this.service = (name) => {
            return service[name];
        };
        this.search = (query = {}) => {
            return new search_1.search(query);
        };
        this.pagination = (model) => {
            return new pagination_1.pagination(this.models[model]);
        };
        this.validationError = (error) => {
            return new validation_1.validation_error(error);
        };
        this.user = {};
        this.setUser = (req) => {
            if (req.user) {
                this.user = Object.assign({}, req.user.toJSON());
            }
        };
        this.init = (req, res) => {
            this.setUser(req);
        };
    }
    get models() {
        return models;
    }
}
exports.feeds = feeds;
