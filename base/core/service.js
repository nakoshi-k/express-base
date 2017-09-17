"use strict";
exports.__esModule = true;
var search_1 = require("./search");
var pagination_1 = require("./pagination");
var models = require("../../models");
var service = /** @class */ (function () {
    function service(name) {
        var _this = this;
        this.search = function (query) {
            if (query === void 0) { query = {}; }
            return new search_1.search(query);
        };
        this.pagination = function (model) {
            if (model === void 0) { model = _this.model; }
            return new pagination_1.pagination(model);
        };
        this.models = models;
        this.model = models[name];
    }
    return service;
}());
exports.service = service;
