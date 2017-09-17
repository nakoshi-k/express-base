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
var helper_1 = require("../helper");
var crud_helper = /** @class */ (function (_super) {
    __extends(crud_helper, _super);
    function crud_helper() {
        var _this = _super.call(this) || this;
        _this._deleteTemplate = "delete";
        _this.loading = function () {
            _this.cell.add("delete", _this.deleteTemplate);
            return _this.cell.ready();
        };
        _this["delete"] = function (title, options, linkOptions) {
            if (options === void 0) { options = { path: "example", id: "id", csrf: "csrf", redirect: "redirect" }; }
            if (linkOptions === void 0) { linkOptions = { "class": "button outline" }; }
            var node_uuid = require('node-uuid');
            var uuid = node_uuid.v4().split("-").join("");
            var delFunc = "del_" + uuid + "()";
            var endPoint = options.path.replace("#", String(options.id));
            var vars = {
                id: options.id,
                delFunc: delFunc,
                endPoint: endPoint,
                token: options.csrf,
                redirect: options.redirect
            };
            var s = _this.tag.wrap("a", "delete", { href: "#", "onClick": delFunc, "class": linkOptions["class"] });
            return s + _this.cell.render("delete", vars);
        };
        _this.tag = new helper_1.tag();
        _this.cell = new helper_1.cell();
        return _this;
    }
    Object.defineProperty(crud_helper.prototype, "deleteTemplate", {
        get: function () {
            return this._deleteTemplate;
        },
        set: function (path) {
            this._deleteTemplate = path;
        },
        enumerable: true,
        configurable: true
    });
    return crud_helper;
}(core_1.helper));
exports.crud_helper = crud_helper;
