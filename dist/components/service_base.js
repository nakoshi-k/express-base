"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("./search");
const pagination_1 = require("./pagination");
class service_base {
    constructor(name) {
        this.search = (query = {}) => {
            return new search_1.search(query);
        };
        this.pagination = (model = this.model) => {
            return new pagination_1.pagination(model);
        };
        let models = require('../models');
        this.models = models;
        this.model = models[name];
    }
}
exports.service_base = service_base;
