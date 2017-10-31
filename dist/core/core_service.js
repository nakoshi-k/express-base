"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("./lib/search");
const pagination_1 = require("./lib/pagination");
const validation_1 = require("./lib/validation");
const models = require("../models");
const errors_1 = require("./errors/errors");
class core_service {
    constructor(name) {
        this.search = (query = {}) => {
            return new search_1.search(query);
        };
        this.pagination = (req, res) => {
            let page = new pagination_1.pagination(this.model);
            let conditions = this.conditions(req);
            const pagination = (resolve, reject) => {
                page.find(conditions, req.query).then((r) => {
                    let data = {};
                    data[this.name] = r.rows;
                    data.count = r.count;
                    data.page = r.pagination;
                    res.locals["data"] = data;
                    resolve(data);
                }).catch(e => {
                    res.locals["data"] = {};
                    res.locals["data"][this.name] = [];
                    res.locals["data"]["page"] = {};
                    reject(e);
                });
            };
            return new Promise(pagination);
        };
        this.get_entity = (id) => {
            const entity = (resolve, reject) => {
                this.model.findById(id).then((result) => {
                    if (!result) {
                        reject(new errors_1.missing_entity("no result"));
                        return;
                    }
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(entity);
        };
        this.new_entity = (data) => {
            return this.model.build(data);
        };
        this.save_entity = (newData) => {
            let entity = this.new_entity(newData);
            const save_entity = (resolve, reject) => {
                entity.save().then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(save_entity);
        };
        this.update_entity = (id, newData) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.get_entity(id);
            return yield entity.update(newData);
        });
        this.validationError = (error) => {
            return new validation_1.validation_error(error);
        };
        this.name = name;
        this.models = models;
        this.model = models[name];
    }
}
exports.core_service = core_service;
