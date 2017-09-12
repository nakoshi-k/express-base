"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let deepAssign = require('deep-assign');
class search {
    constructor(query = {}) {
        this._where = {};
        this._query = {};
        this._limit = 10;
        this._offset = 1;
        this.like = (template, alias = "") => {
            return (names, self) => {
                alias = (alias !== "") ? alias : names;
                let s = template.replace("{word}", this.query[names]);
                self.add(alias, { $like: s });
            };
        };
        this.numericComparison = (names, self, alias, type) => {
            alias = (alias !== "") ? alias : names;
            let rule = {};
            rule[type] = self.query[names];
            self.add(alias, rule);
        };
        this.eq = (alias = "") => {
            return (names, self) => {
                self.numericComparison(names, self, alias, "$eq");
            };
        };
        this.gt = (alias = "") => {
            return (names, self) => {
                self.numericComparison(names, self, alias, "$gt");
            };
        };
        this.gte = (alias = "") => {
            return (names, self) => {
                self.numericComparison(names, self, alias, "$gte");
            };
        };
        this.lt = (alias = "") => {
            return (names, self) => {
                self.numericComparison(names, self, alias, "$lt");
            };
        };
        this.lte = (alias = "") => {
            return (names, self) => {
                self.numericComparison(names, self, alias, "$lte");
            };
        };
        this.add = (names, value) => {
            let rule = {};
            rule[names] = value;
            this._where = deepAssign(this._where, rule);
        };
        this.between = (alias = "") => {
            return (names, self) => {
                alias = (alias !== "") ? alias : names;
                self.add(alias, { $between: [self.query[names[0]], self.query[names[1]]] });
            };
        };
        this.append = (names, callback = (name, self) => { }) => {
            if (names === "custom") {
                callback(names, this);
                return;
            }
            if (!Array.isArray(names)) {
                names = [names];
            }
            for (let i = 0; i < names.length; i++) {
                if (typeof this.query[names[i]] === "undefined") {
                    return this;
                }
            }
            callback(names, this);
            return this;
        };
        this.query = query;
        return this;
    }
    get offset() {
        return this._offset;
    }
    set offset(offset) {
        this._offset = offset;
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
    }
    set page(page) {
        if (!page) {
            page = 1;
        }
        this.offset = this.limit * (page - 1);
    }
    build() {
        return {
            offset: this.offset,
            limit: this.limit,
            where: this._where
        };
    }
    set query(query) {
        this._query = query;
    }
    get query() {
        return this._query;
    }
}
exports.search = search;
//export let search = new search_class(); 
