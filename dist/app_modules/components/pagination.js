"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class pagination {
    constructor(model) {
        this.find = (findOptions, queryPrams = {}) => {
            let pagination = new Promise((resolve, reject) => {
                this.model.findAndCountAll(findOptions)
                    .then((res) => {
                    let pagination = { pagination: { totalPage: 0, currentPage: 1 } };
                    pagination.pagination.queryPrams = queryPrams;
                    let offset = (findOptions.offset) ? findOptions.offset : 0;
                    let limit = (findOptions.limit) ? findOptions.limit : 10;
                    if (limit > 0) {
                        pagination.pagination.totalPage = Math.ceil(res.count / limit);
                        pagination.pagination.currentPage = Math.ceil(offset / limit) + 1;
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
        this.model = model;
    }
}
exports.pagination = pagination;
//export let search = new search_class(); 
