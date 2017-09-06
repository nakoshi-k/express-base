"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class service_base {
    constructor(name) {
        this.pagination = (query) => {
            let pagination = new Promise((resolve, reject) => {
                this.model.findAndCountAll(query)
                    .then((res) => {
                    let pagination = { pagination: { totalPage: 0, currentPage: 1 } };
                    pagination.pagination.query = query;
                    let offset = (query.offset) ? query.offset : 0;
                    let limit = (query.limit) ? query.limit : 0;
                    if (limit > 0) {
                        pagination.pagination.total = Math.ceil(res.count / limit);
                        pagination.pagination.currentPage = offset + 1;
                    }
                    pagination = Object.assign(res, pagination);
                    resolve(pagination);
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            });
            return pagination;
        };
        let models = require('../models');
        this.models = models;
        this.model = models[name];
    }
}
exports.service_base = service_base;
