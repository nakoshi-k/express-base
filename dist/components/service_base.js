"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("./search");
class service_base {
    constructor(name) {
        this.search = (query) => {
            return new search_1.search(query);
        };
        this.whereBuild = (query) => {
            let where = this.search(query);
            return where.build;
        };
        /*
         *
         * $param query
         * $return recodeset and pagination
         */
        this.pagination = (findOptions, queryPrams = {}) => {
            let pagination = new Promise((resolve, reject) => {
                this.model.findAndCountAll(findOptions)
                    .then((res) => {
                    let pagination = { pagination: { totalPage: 0, currentPage: 1 } };
                    pagination.pagination.queryPrams = queryPrams;
                    let offset = (findOptions.offset) ? findOptions.offset : 0;
                    let limit = (findOptions.limit) ? findOptions.limit : 0;
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
