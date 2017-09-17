"use strict";
exports.__esModule = true;
var pagination = /** @class */ (function () {
    function pagination(model) {
        var _this = this;
        this.find = function (findOptions, queryPrams) {
            if (queryPrams === void 0) { queryPrams = {}; }
            var pagination = new Promise(function (resolve, reject) {
                _this.model.findAndCountAll(findOptions)
                    .then(function (res) {
                    var pagination = { pagination: { totalPage: 0, currentPage: 1 } };
                    pagination.pagination.queryPrams = queryPrams;
                    var offset = (findOptions.offset) ? findOptions.offset : 0;
                    var limit = (findOptions.limit) ? findOptions.limit : 10;
                    if (limit > 0) {
                        pagination.pagination.totalPage = Math.ceil(res.count / limit);
                        pagination.pagination.currentPage = Math.ceil(offset / limit) + 1;
                    }
                    pagination = Object.assign(res, pagination);
                    resolve(pagination);
                })["catch"](function (e) {
                    console.log(e);
                    reject(e);
                });
            });
            return pagination;
        };
        this.model = model;
    }
    return pagination;
}());
exports.pagination = pagination;
