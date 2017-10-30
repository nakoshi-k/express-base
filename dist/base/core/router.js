"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const renderer_1 = require("./renderer");
const inflection = require("inflection");
var core_1 = require("../core");
exports.system = core_1.system;
exports.helper = core_1.helper;
class router {
    constructor() {
        this.name = "router";
        this._middle_ware = {};
        this.strip_object_key = (obj) => {
            let ary = [];
            for (let k in obj) {
                ary.push(obj[k]);
            }
            return ary;
        };
        this.middle_ware = (md = []) => {
            if (!md) {
                return this.strip_object_key(this._middle_ware);
            }
            if (md.length === 0) {
                return this.strip_object_key(this._middle_ware);
            }
            let midware = [];
            md.forEach((name) => {
                midware.push(this[name]);
            });
            return midware;
        };
        this.mw_regist = (key, mw) => {
            this._middle_ware[key] = mw;
        };
        this.map = (included = []) => {
            let router = e.Router();
            let middle_ware = this.middle_ware;
            let map = this._mapping();
            if (included.length === 0) {
                included = Object.keys(map);
            }
            included.forEach((key) => {
                let m = map[key];
                router[m.method](m.route, ...middle_ware(m.middle_ware), this[m.component]);
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
exports.router = router;
