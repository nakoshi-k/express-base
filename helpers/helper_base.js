"use strict";
exports.__esModule = true;
var helper_base = /** @class */ (function () {
    function helper_base() {
        var _this = this;
        this.load = function (name) {
            _this[name] = require("./" + name + "_helper");
        };
    }
    return helper_base;
}());
exports.helper_base = helper_base;
