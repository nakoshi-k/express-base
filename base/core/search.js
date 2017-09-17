"use strict";
exports.__esModule = true;
var deepAssign = require("deep-assign");
var search = /** @class */ (function () {
    function search(query) {
        if (query === void 0) { query = {}; }
        var _this = this;
        this._where = {};
        this._query = {};
        this._limit = 10;
        this._offset = 1;
        this.like = function (template, alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                alias = (alias !== "") ? alias : names;
                var s = template.replace("{word}", _this.query[names]);
                self.add(alias, { $like: s });
            };
        };
        this.numericComparison = function (names, self, alias, type) {
            alias = (alias !== "") ? alias : names;
            var rule = {};
            rule[type] = self.query[names];
            self.add(alias, rule);
        };
        this.eq = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                self.numericComparison(names, self, alias, "$eq");
            };
        };
        this.gt = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                self.numericComparison(names, self, alias, "$gt");
            };
        };
        this.gte = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                self.numericComparison(names, self, alias, "$gte");
            };
        };
        this.lt = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                self.numericComparison(names, self, alias, "$lt");
            };
        };
        this.lte = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                self.numericComparison(names, self, alias, "$lte");
            };
        };
        this.add = function (names, value) {
            var rule = {};
            rule[names] = value;
            _this._where = deepAssign(_this._where, rule);
        };
        this.between = function (alias) {
            if (alias === void 0) { alias = ""; }
            return function (names, self) {
                alias = (alias !== "") ? alias : names;
                self.add(alias, { $between: [self.query[names[0]], self.query[names[1]]] });
            };
        };
        this.append = function (names, callback) {
            if (callback === void 0) { callback = function (name, self) { }; }
            if (names === "custom") {
                callback(names, _this);
                return;
            }
            if (!Array.isArray(names)) {
                names = [names];
            }
            for (var i = 0; i < names.length; i++) {
                if (typeof _this.query[names[i]] === "undefined") {
                    return _this;
                }
            }
            callback(names, _this);
            return _this;
        };
        this.query = query;
        return this;
    }
    Object.defineProperty(search.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (offset) {
            this._offset = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(search.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (limit) {
            this._limit = limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(search.prototype, "page", {
        set: function (page) {
            if (!page) {
                page = 1;
            }
            this.offset = this.limit * (page - 1);
        },
        enumerable: true,
        configurable: true
    });
    search.prototype.build = function () {
        return {
            offset: this.offset,
            limit: this.limit,
            where: this._where
        };
    };
    Object.defineProperty(search.prototype, "query", {
        get: function () {
            return this._query;
        },
        set: function (query) {
            this._query = query;
        },
        enumerable: true,
        configurable: true
    });
    return search;
}());
exports.search = search;
//export let search = new search_class(); 
