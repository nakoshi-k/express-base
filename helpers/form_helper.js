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
var helper_base_1 = require("./helper_base");
var form_helper = /** @class */ (function (_super) {
    __extends(form_helper, _super);
    function form_helper() {
        var _this = _super.call(this) || this;
        _this.bindData = {};
        _this.bind = function (bindData) {
            if (bindData === void 0) { bindData = {}; }
            _this.bindData = Object.assign(_this.bindData, bindData);
        };
        _this.unBind = function () {
            _this.bindData = {};
        };
        _this.initAttr = function (name, attr) {
            if (attr === void 0) { attr = {}; }
            attr["name"] = name;
            if (attr["value"]) {
                return attr;
            }
            if (name in _this.bindData) {
                attr["value"] = _this.bindData[name];
                return attr;
            }
            return attr;
        };
        _this.csrf = function (token) {
            return _this.tag.create("input", { name: "_csrf", value: token, type: "hidden" });
        };
        _this.start = function (name, bindData, attr) {
            if (attr === void 0) { attr = {}; }
            _this.bind(bindData);
            var def = {
                method: "post",
                action: ""
            };
            var csrfTag = "";
            if ("csrf" in _this.bindData) {
                csrfTag = _this.csrf(_this.bindData["csrf"]);
            }
            attr["name"] = name;
            attr = Object.assign(def, attr);
            return _this.tag.create("form", attr) + csrfTag;
        };
        _this.end = function () {
            _this.unBind();
            return _this.tag.create("/form");
        };
        _this.submit = function (title, attr) {
            if (attr === void 0) { attr = { "class": "button primary" }; }
            return _this.tag.wrap("button", title, attr);
        };
        _this.input = function (name, attr) {
            if (attr === void 0) { attr = {}; }
            attr = _this.initAttr(name, attr);
            return _this.tag.create("input", attr);
        };
        _this.textarea = function (name, attr) {
            if (attr === void 0) { attr = {}; }
            attr = _this.initAttr(name, attr);
            var innerContent = attr["value"];
            attr = _this.removeAttr("value", attr);
            return _this.tag.wrap("textarea", innerContent, attr);
        };
        _this.removeAttr = function (property, attr) {
            if (attr === void 0) { attr = {}; }
            if (attr.hasOwnProperty(property)) {
                delete attr[property];
            }
            return attr;
        };
        _this.selector = function (name, options, attr) {
            if (options === void 0) { options = {}; }
            if (attr === void 0) { attr = {}; }
            var build = function (type) {
                var tag = "";
                var childAttr = {};
                var flg = (type === "radio") ? "checked" : "selected";
                for (var key in options) {
                    childAttr["value"] = key;
                    if (attr["value"] + "" === key) {
                        childAttr[flg] = flg;
                    }
                    if (type === "select") {
                        tag += _this.tag.wrap("option", options[key], childAttr);
                        continue;
                    }
                    if (type === "radio") {
                        childAttr["type"] = "radio";
                        tag += _this.input(name, childAttr);
                        continue;
                    }
                }
                return tag;
            };
            var selector = {
                select: function () {
                    return build("select");
                },
                radio: function () {
                    return build("radio");
                }
            };
            return selector;
        };
        _this.radio = function (name, options, attr) {
            if (options === void 0) { options = {}; }
            if (attr === void 0) { attr = {}; }
            var childAttr = {};
            return _this.selector(name, options, attr).radio();
        };
        _this.select = function (name, options, attr) {
            if (options === void 0) { options = {}; }
            if (attr === void 0) { attr = {}; }
            attr = _this.initAttr(name, attr);
            var tag = _this.selector(name, options, attr).select();
            attr = _this.removeAttr("value", attr);
            return _this.tag.wrap("select", tag, attr);
        };
        _this.checkbox = function (name, attr) {
            if (attr === void 0) { attr = {}; }
            attr = _this.initAttr(name, attr);
            attr["type"] = "checkbox";
            return _this.tag.create("input", attr);
        };
        _this.file = function (name, attr) {
            attr = _this.initAttr(name, attr);
            attr["type"] = "file";
            _this.input(name, attr);
        };
        _this.load("tag"); //Tagヘルパーの呼び出し。
        _this.bindData = {};
        return _this;
    }
    return form_helper;
}(helper_base_1.helper_base));
module.exports = new form_helper();
