"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../../base/sideless/build_query");
class internal {
    constructor(options) {
        this._options = {
            credentials: 'same-origin',
            method: "get",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        };
        this.endPoint = "";
        this.host = "";
        this.client = (url, options) => {
            let base = this.options;
            if (options.headers) {
                options.headers = Object.assign(base.headers, options.headers);
            }
            options = Object.assign(base, options);
            let client = (resolve, reject) => {
                fetch(url, options)
                    .then((response) => {
                    //deleted
                    if (response.status === 204) {
                        resolve(response.status);
                        return;
                    }
                    response.json().then(r => {
                        if (response.status < 200 || response.status > 300) {
                            reject(r);
                            return;
                        }
                        resolve(r);
                    });
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(client);
        };
        this.serverPagination = (route) => {
            let serverPagination = (resolve, reject) => {
                let pagination = this.service.pagination();
                let conditions = this.service.conditions(route);
                let entities = pagination.find(conditions, route.query);
                let name = this.service.name;
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
            let entity = this.service.model;
            let serverEntity = (resolve, reject) => {
                let model = this.service.model;
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
            let req = this.request;
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
            let URI = `${this.endPoint}/${this.routeParse(route)}${bq.http(route.query)}`;
            if (typeof window === "undefined") {
                return this.server("paginate", route);
            }
            return this.client(URI, {});
        };
        this.entity = (route) => {
            let id = route.params.id;
            let URI = `${this.endPoint}/${id}`;
            if (typeof window === "undefined") {
                return this.server("entity", route);
            }
            return this.client(URI, {});
        };
        this.insert = (entity, mount, token) => {
            entity = JSON.stringify(entity);
            let URI = mount;
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
        this.update = (entity, mount, token) => {
            let URI = mount + "/" + entity.id;
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
        this.delete = (id, mount, token) => {
            let URI = mount + "/" + id;
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
        this.host = options.host;
        this.request = options.request;
        this.service = options.service;
    }
    get options() {
        return Object.create(this._options);
    }
    routeParse(route) {
        let params = route.params;
        let paramsStr = "";
        for (let key in params) {
            paramsStr = `${key}/${params[key]}`;
        }
        return paramsStr;
    }
}
exports.internal = internal;
