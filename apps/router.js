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
var core_2 = require("../base/core");
var router = /** @class */ (function (_super) {
    __extends(router, _super);
    function router() {
        var _this = _super.call(this) || this;
        _this.name = "router";
        _this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname + core_2.system.ds
        };
        return _this;
    }
    return router;
}(core_1.router));
exports.router = router;
