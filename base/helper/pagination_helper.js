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
var paginationConfig = /** @class */ (function () {
    function paginationConfig() {
        this.wrap = { tag: "nav", tagClass: "pagination" };
        this.parent = { tag: "ul", tagClass: "pagination-list" };
        this.child = { tag: "li", tagClass: "", linkClass: "" };
        this.disable = { tagClass: "disable", innerTag: "a", innerClass: "disable" };
        this.prev = { tagClass: "prev", innerTag: "span", innerClass: "" };
        this.next = { tagClass: "next", innerTag: "span", innerClass: "" };
        this.first = { tagClass: "first", innerTag: "span", innerClass: "" };
        this.last = { tagClass: "last", innerTag: "span", innerClass: "" };
        this.active = { tagClass: "active", innerTag: "a", innerClass: "" };
        this.text = { first: "&laquo; First", last: "Last &raquo;", prev: "&lsaquo; Prev", next: "Next &rsaquo;" };
    }
    return paginationConfig;
}());
var pagination_helper = /** @class */ (function (_super) {
    __extends(pagination_helper, _super);
    function pagination_helper() {
        var _this = _super.call(this) || this;
        _this.page = {};
        _this.path = "/page/#";
        _this.start = function (pagenationInterface, path) {
            _this.page = pagenationInterface;
            _this.path = path;
        };
        _this.buildPath = function (path, innerText) {
            _this.appendQuery();
            return path.replace("#", innerText) + _this.appendQuery();
        };
        _this.buildLinkTag = function (innerText, pageNum) {
            var path = _this.path;
            var child = _this.config.child;
            var linkOpt = { href: _this.buildPath(path, String(pageNum)), "class": child.linkClass };
            var link = _this.tag.wrap("a", innerText, linkOpt);
            return link;
        };
        _this.buildDisableTag = function (innerText, pageNum) {
            var disable = _this.config.disable;
            var Opt = { "class": disable.innerClass };
            var link = _this.tag.wrap(disable.innerTag, innerText, Opt);
            return link;
        };
        _this.buildAvtiveTag = function (innerText, pageNum) {
            var active = _this.config.active;
            var Opt = { href: "#", "class": active.innerClass };
            var link = _this.tag.wrap(active.innerTag, innerText, Opt);
            return link;
        };
        _this.isActive = function (pageNum) {
            if (_this.page.currentPage === pageNum) {
                return true;
            }
            return false;
        };
        _this.special = function (name, disableCondition, pageNum) {
            if (disableCondition === void 0) { disableCondition = false; }
            if (_this.page.totalPage === 0) {
                return "";
            }
            var innerText = _this.config.text[name];
            var tag = _this.buildLinkTag(innerText, pageNum);
            var addClass = _this.config[name].tagClass;
            if (disableCondition) {
                tag = _this.buildDisableTag(innerText, pageNum);
                addClass += " " + _this.config.disable.tagClass;
            }
            return "\n" + _this.buildChild(tag, addClass);
        };
        _this.first = function () {
            var disableCondition = (_this.page.currentPage === 1);
            return _this.special("first", disableCondition, 1);
        };
        _this.last = function () {
            var lastPage = _this.page.totalPage;
            var disableCondition = (_this.page.currentPage === lastPage);
            return _this.special("last", disableCondition, lastPage);
        };
        _this.prev = function () {
            var prevPage = _this.page.currentPage - 1;
            var disableCondition = (prevPage < 1);
            return _this.special("prev", disableCondition, prevPage);
        };
        _this.next = function () {
            var nextPage = _this.page.currentPage + 1;
            var disableCondition = (nextPage > _this.page.totalPage);
            return _this.special("next", disableCondition, nextPage);
        };
        _this.numbers = function () {
            var source = "";
            var c = _this.page.totalPage;
            for (var i = 1; i <= c; i++) {
                var link = _this.buildLinkTag(String(i), i);
                var addClass = "";
                if (_this.isActive(i)) {
                    link = _this.buildAvtiveTag(String(i), i);
                    addClass = _this.config.active.tagClass;
                }
                source += "\n" + _this.buildChild(link, addClass);
            }
            return source;
        };
        _this.end = function () {
            _this.page = {};
        };
        _this.wrap = function (source) {
            if (_this._config.wrap) {
                var conf = _this._config.wrap;
                source = _this.tag.wrap(conf.tag, source, { "class": conf.tagClass });
            }
            return source;
        };
        _this.render = function (pagenationInterface, option) {
            if (option === void 0) { option = { path: "/page/#" }; }
            _this.start(pagenationInterface, option.path);
            var html = "";
            html += _this.first();
            html += _this.prev();
            html += _this.numbers();
            html += _this.next();
            html += _this.last();
            var parent = _this._config.parent;
            html = _this.tag.wrap(parent.tag, html, { "class": parent.tagClass });
            return _this.wrap(html);
        };
        _this.tag = new helper_1.tag();
        _this.config = new paginationConfig();
        return _this;
    }
    Object.defineProperty(pagination_helper.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    pagination_helper.prototype.appendQuery = function () {
        var prts = this.page.queryPrams;
        if (prts.length === 0) {
            return "";
        }
        var q = "";
        Object.keys(prts).forEach(function (key) {
            q += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(prts[key]);
        });
        return q.replace("&", "?");
    };
    pagination_helper.prototype.buildChild = function (innerText, addClass) {
        if (addClass === void 0) { addClass = ""; }
        var child = this.config.child;
        addClass = (addClass === "") ? "" : " " + addClass;
        var cssClass = child.linkClass + addClass;
        return this.tag.wrap(child.tag, innerText, { "class": cssClass.trim() });
    };
    return pagination_helper;
}(core_1.helper));
exports.pagination_helper = pagination_helper;
