"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const internal_1 = require("../../api/internal");
let api;
class actions extends actions_1.actions {
    constructor(options) {
        super();
        this.fetchEntities = ({ commit }, route) => {
            return api.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.saveEntity = ({ commit }, route) => {
            return api.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        api = new internal_1.internal({
            host: options.host,
            endPoint: options.endPoint,
            request: options.request,
        });
    }
}
exports.actions = actions;
