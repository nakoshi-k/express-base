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
var core_1 = require("../base/core");
var service = /** @class */ (function (_super) {
    __extends(service, _super);
    function service() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "service";
        return _this;
    }
    return service;
}(core_1.service));
exports.service = service;
