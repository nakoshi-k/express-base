"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../base/sideless/build_query");
const client_fetch_1 = require("./client_fetch");
const route_parse_1 = require("../utilities/route_parse");
const resource_1 = require("./resource");
let client = new client_fetch_1.client_fetch();
class internal_crud extends resource_1.resource {
    constructor(options) {
        super();
        this.endPoint = "";
        this.client = (url, options) => {
            return client.fetch(url, options);
        };
        this.serverPagination = (route) => {
            let serverPagination = (resolve, reject) => {
                let service = this.feeds.service(this.resource);
                let pagination = this.feeds.pagination(this.resource);
                let conditions = service.conditions(route);
                let entities = pagination.find(conditions, route.query);
                let name = this.resource;
                let data = {};
                entities.then((result) => {
                    if (result.rows.length === 0) {
                        reject(false);
                    }
                    ;
                    data[name] = result.rows;
                    data["page"] = result.pagination;
                    resolve(data);
                }).catch((error) => {
                    data[name] = {};
                    data["page"] = {};
                    reject(error);
                });
            };
            return serverPagination;
        };
        this.serverEntity = (route) => {
            let serverEntity = (resolve, reject) => {
                let model = this.feeds.model(this.resource);
                let data = {};
                model.findById(route.params.id).then((result) => {
                    if (!result) {
                        reject();
                        throw Error;
                    }
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            };
            return serverEntity;
        };
        this.server = (type, route) => {
            let server;
            if (type === "paginate") {
                server = this.serverPagination(route);
            }
            if (type === "entity") {
                server = this.serverEntity(route);
            }
            return new Promise(server);
        };
        this.paginate = (route) => {
            let bq = new build_query_1.build_query();
            let URI = `${this.endPoint}/${route_parse_1.default.parse(route)}${bq.http(route.query)}`;
            if (this.is_server()) {
                return this.server("paginate", route);
            }
            return this.client(URI, {});
        };
        this.entity = (route) => {
            let id = route.params.id;
            let URI = `${this.endPoint}/${id}`;
            if (this.is_server()) {
                return this.server("entity", route);
            }
            return this.client(URI, {});
        };
        this.insert = (entity, token) => {
            entity = JSON.stringify(entity);
            let URI = this.endPoint;
            let insert = (resolve, reject) => {
                this.client(URI, {
                    body: entity,
                    method: "post",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(insert);
        };
        this.update = (entity, token) => {
            let URI = this.endPoint + "/" + entity.id;
            entity = JSON.stringify(entity);
            let insert = (resolve, reject) => {
                this.client(URI, {
                    body: entity,
                    method: "put",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(insert);
        };
        this.delete = (id, token) => {
            let URI = this.endPoint + "/" + id;
            let del = (resolve, reject) => {
                this.client(URI, {
                    method: "delete",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve("api delete ok");
                }).catch(e => {
                    reject("api delete error");
                });
            };
            return new Promise(del);
        };
        this.endPoint = options.endPoint;
        this.resource = options.resource;
        this.feeds = options.feeds;
    }
}
exports.internal_crud = internal_crud;
