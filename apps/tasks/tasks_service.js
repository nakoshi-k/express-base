"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var service_1 = require("../service");
var tasks_service = /** @class */ (function (_super) {
    __extends(tasks_service, _super);
    function tasks_service(name) {
        var _this = _super.call(this, name) || this;
        _this.conditions = function (req) {
            var search = _this.search();
            search.query = req.query;
            search.page = req.params.page;
            search.limit = 10;
            search.append("title", search.like("%{word}%"));
            return search.build();
        };
        return _this;
    }
    return tasks_service;
}(service_1.service));
exports.tasks_service = tasks_service;
