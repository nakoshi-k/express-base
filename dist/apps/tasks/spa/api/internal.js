"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../Interface");
const build_query_1 = require("../../../../base/sideless/build_query");
class internal {
    constructor(options = Interface_1.createOptions) {
        this.options = {
            credentials: 'same-origin',
            method: "get",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        };
        this.entity_name = "";
        this.entities_name = "";
        this.host = "";
        this.client = (url, options) => {
            let client = (resolve, reject) => {
                options = Object.assign(this.options, options);
                fetch(url, options)
                    .then((response) => {
                    if (response.status !== 201) {
                        reject(response.status);
                    }
                    ;
                    return response.json();
                }).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(client);
        };
        this.server = (url, options = {}) => {
            let req = this.request;
            let srvOptions = Object.assign(this.options, options);
            let server = (resolve, reject) => {
                let options = {
                    url: `${this.host}${url}`,
                    method: srvOptions.method,
                    headers: srvOptions.headers
                };
                req(options, (error, response, body) => {
                    if (error) {
                        reject(true);
                        return;
                    }
                    resolve(JSON.parse(body));
                });
            };
            return new Promise(server);
        };
        this.paginate = (route) => {
            let bq = new build_query_1.build_query();
            let url = `/${this.entities_name}/${this.routeParse(route)}${bq.http(route.query)}`;
            if (typeof window === "undefined") {
                return this.server(url, {});
            }
            return this.client(url, {});
        };
        this.entity = (route) => {
            let id = route.params.id;
            let url = `/${this.entities_name}/${id}`;
            if (typeof window === "undefined") {
                return this.server(url, {});
            }
            return this.client(url, {});
        };
        this.insert = () => {
        };
        this.delete = () => {
        };
        this.entity_name = options.entity;
        this.entities_name = options.entities;
        this.host = options.host;
        this.request = options.server.request;
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
