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
var app_error = /** @class */ (function () {
    function app_error(message) {
        this.message = message;
        this.name = 'app_error';
    }
    app_error.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };
    return app_error;
}());
exports.app_error = app_error;
var input_error = /** @class */ (function (_super) {
    __extends(input_error, _super);
    function input_error() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return input_error;
}(app_error));
exports.input_error = input_error;
