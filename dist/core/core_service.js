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
        this.parent = {};
        this.search = (query = {}) => {
            return new search_1.search(query);
        };
        this.pagination = (req, res = { locals: {} }) => {
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
        this.get_entities = (where, includes) => {
            const eintities = (resolve, reject) => {
                let conditions = {
                    where: where
                };
                if (includes) {
                    conditions.include = this.create_association(includes);
                }
                this.model.findAll(conditions).then((result) => {
                    if (!result) {
                        reject(new errors_1.missing_entity("no result"));
                        return;
                    }
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(eintities);
        };
        this.create_association = (includes) => {
            let association = [];
            for (let k in includes) {
                association.push({ model: this.models[includes[k]] });
            }
            return association;
        };
        this.get_entity = (id, includes = {}) => {
            const entity = (resolve, reject) => {
                let conditions = {
                    where: { id: id }
                };
                if (includes) {
                    conditions.include = this.create_association(includes);
                }
                this.model.findOne(conditions).then((result) => {
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
        this.tranAsync = (ps) => __awaiter(this, void 0, void 0, function* () {
            let entity = yield ps[0];
            let prev = entity;
            for (let i = 1; i < ps.length; i++) {
                prev = yield ps[i](prev, entity);
            }
            return prev;
        });
        this.tran = (ps) => {
            const tran = this.models.sequelize['transaction']().then(transaction => {
                return this.tranAsync(ps).then(r => {
                    transaction.commit();
                    return r;
                }).catch(e => {
                    transaction.rollback();
                    return e;
                });
            });
            return tran;
        };
        this.save_entity = (newData, includes) => {
            const save_entity = (resolve, reject) => {
                this.model.create(newData, { include: this.create_association(includes) }).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(save_entity);
        };
        this.update_entity = (id, newData, includes) => {
            let p = [];
            p.push(this.get_entity(id, includes));
            p.push((prev, entity) => Promise.resolve(prev.set(newData)));
            p.push((prev, entity) => entity.user_profile.save());
            p.push((prev, entity) => entity.save());
            return this.tran(p);
        };
        this.delete_entity = (id) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.get_entity(id);
            return yield entity.destroy();
        });
        this.validationError = (error) => {
            return new validation_1.validation_error(error);
        };
        this.get_list = (list_option = {}) => {
            let key_field = "";
            let value_field = "id";
            if (list_option.value_field) {
                value_field = list_option.value_field;
            }
            if (list_option.key_field) {
                key_field = list_option.key_field;
            }
            if (!list_option.key_field) {
                let fields = Object.keys(this.model["rawAttributes"]);
                let candidate = ["name", "title", "id"].reverse();
                candidate.forEach((v, idx) => {
                    if (fields.indexOf(v) > -1) {
                        key_field = v;
                        return;
                    }
                });
            }
            let options = {
                attributes: [value_field, key_field]
            };
            if (list_option.where) {
                options["where"] = list_option.where;
            }
            const get_list = (resolve, reject) => {
                this.model.findAll(options)
                    .then((result) => {
                    let list = [];
                    result.forEach((v, idx) => {
                        list.push({ text: v.getDataValue(key_field), value: v.getDataValue(value_field) });
                    });
                    resolve(list);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(get_list);
        };
        this.models = models;
        this.model = models[name];
        for (let k in this) {
            this.parent[k] = this[k];
        }
    }
}
exports.core_service = core_service;
