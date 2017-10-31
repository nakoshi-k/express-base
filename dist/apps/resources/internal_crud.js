"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../core/lib/build_query");
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
        this.paginate = (route) => {
            let bq = new build_query_1.build_query();
            let URI = `${this.endPoint}/${route_parse_1.default.parse(route)}${bq.http(route.query)}`;
            if (this.is_server()) {
                let service = this.feeds.service(this.resource);
                return service.pagination(route);
            }
            return this.client(URI, {});
        };
        this.entity = (route) => {
            let id = route.params.id;
            let URI = `${this.endPoint}/${id}`;
            if (this.is_server()) {
                let service = this.feeds.service(this.resource);
                return service.get_entity(route.params.id);
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
