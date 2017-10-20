"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../../models");
const core_1 = require("../../base/core");
class feeds {
    constructor() {
        this.model = (name) => {
            return this.models[name];
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
