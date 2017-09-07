"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let deepAssign = require('deep-assign');
class search {
    constructor(query = {}) {
        this._where = {};
        this._query = {};
        this.like = (template, alias = "") => {
            return (name, self) => {
                alias = (alias !== "") ? alias : name;
                let s = template.replace("{word}", this.query[name]);
                self.add(alias, { $like: s });
            };
        };
        this.numericComparison = (name, self, alias, type) => {
            alias = (alias !== "") ? alias : name;
            let rule = {};
            rule[type] = this.query[name];
            self.add(alias, rule);
        };
        this.eq = (alias = "") => {
            return (name, self) => {
                this.numericComparison(name, self, alias, "$eq");
            };
        };
        this.gt = (alias) => {
            return this.numericComparison(name, self, alias, "$gt");
        };
        this.gte = (alias) => {
            return this.numericComparison(name, self, alias, "$gte");
        };
        this.lt = (alias) => {
            return this.numericComparison(name, self, alias, "$lt");
        };
        this.lte = (alias) => {
            return this.numericComparison(name, self, alias, "$lte");
        };
        this.add = (name, value) => {
            let rule = {};
            rule[name] = value;
            this._where = deepAssign(this._where, rule);
        };
        this.append = (name, callback = (name, self) => { }) => {
            if (typeof this.query[name] === undefined) {
                return this;
            }
            callback(name, this);
            return this;
        };
        this.query = query;
        return this;
    }
    get build() {
        return this._where;
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
