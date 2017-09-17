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
var core_1 = require("../core");
var tag_helper = /** @class */ (function (_super) {
    __extends(tag_helper, _super);
    function tag_helper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildAttr = function (attr) {
            var attribute = "";
            for (var key in attr) {
                if (attr[key] === "") {
                    continue;
                }
                attribute += " " + key + '="' + attr[key] + '"';
            }
            return attribute;
        };
        _this.create = function (tagName, attr) {
            if (attr === void 0) { attr = {}; }
            return "<" + tagName + _this.buildAttr(attr) + ">";
        };
        _this.wrap = function (tagName, content, attr) {
            if (content === void 0) { content = ""; }
            if (attr === void 0) { attr = {}; }
            var tag = "";
            content = (content === null) ? "" : content;
            tag += _this.create(tagName, attr);
            tag += content;
            tag += _this.create("/" + tagName);
            return tag;
        };
        return _this;
    }
    return tag_helper;
}(core_1.helper));
exports.tag_helper = tag_helper;
