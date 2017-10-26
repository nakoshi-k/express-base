"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../../models");
const core_1 = require("../../base/core");
const service_1 = require("../api/tasks/service");
const service_2 = require("../api/users/service");
let service = {
    tasks: new service_1.service("tasks"),
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
            return new core_1.search(query);
        };
        this.pagination = (model) => {
            return new core_1.pagination(this.models[model]);
        };
        this.validationError = (error) => {
            return new core_1.validation_error(error);
        };
    }
    get models() {
        return models;
    }
}
exports.feeds = feeds;
