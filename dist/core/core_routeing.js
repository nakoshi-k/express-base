"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const inflection = require("inflection");
const renderer_1 = require("./lib/renderer");
class core_routing {
    constructor() {
        this.name = "router";
        this._pre_middle_ware = {};
        this.strip_object_key = (obj) => {
            let ary = [];
            for (let k in obj) {
                ary.push(obj[k]);
            }
            return ary;
        };
        this.pre_mw = (md = []) => {
            if (!md) {
                return this.strip_object_key(this._pre_middle_ware);
            }
            if (md.length === 0) {
                return this.strip_object_key(this._pre_middle_ware);
            }
            let midware = [];
            md.forEach((name) => {
                midware.push(this[name]);
            });
            return midware;
        };
        this.pre_mw_regist = (key, mw) => {
            this._pre_middle_ware[key] = mw;
        };
        this.map = (included = []) => {
            let router = e.Router();
            let pre_mw = this.pre_mw;
            let map = this._mapping();
            if (included.length === 0) {
                included = Object.keys(map);
            }
            included.forEach((key) => {
                let m = map[key];
                router[m.method](m.route, ...pre_mw(m.pre), this[m.middleware]);
            });
            return router;
        };
        this.renderer = new renderer_1.renderer();
    }
    get entity_name() {
        return inflection.singularize(this.name);
    }
    get entities_name() {
        return inflection.pluralize(this.name);
    }
    get models() {
        return this.service.models;
    }
    get model() {
        return this.service.model;
    }
}
exports.core_routing = core_routing;
