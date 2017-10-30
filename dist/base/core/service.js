"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("./search");
const pagination_1 = require("./pagination");
const validation_1 = require("./validation");
const models = require("../../models");
class service {
    constructor(name) {
        this.search = (query = {}) => {
            return new search_1.search(query);
        };
        this.pagination = (model = this.model) => {
            return new pagination_1.pagination(model);
        };
        this.page = (req, res) => {
            let pagination = this.pagination();
            let conditions = this.conditions(req);
            const page = (resolve, reject) => {
                pagination.find(conditions, req.query).then((r) => {
                    let data = {};
                    data[this.name] = r.rows;
                    data.count = r.count;
                    data.page = r.pagination;
                    res.locals["data"] = data;
                    resolve(data);
                }).catch(e => {
                    res.locals["data"] = {};
                    res.locals["data"][this.name] = [];
                    res.locals["data"]["page"] = {};
                    reject(e);
                });
            };
            return new Promise(page);
        };
        this.validationError = (error) => {
            return new validation_1.validation_error(error);
        };
        this.name = name;
        this.models = models;
        this.model = models[name];
    }
}
exports.service = service;
