"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("./Interface");
class Internal {
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
                    if (response.status === 201) {
                        return response.json();
                    }
                    ;
                    throw Error;
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
                    }
                    resolve(JSON.parse(body));
                });
            };
            return new Promise(server);
        };
        this.paginate = (query = { page: 1, search: "" }) => {
            let url = `/${this.entities_name}/page/${query.page}${query.search}`;
            if (typeof window === "undefined") {
                return this.server(url, {});
            }
            return this.client(url, {});
        };
        this.entity = (query = { page: 1, search: "" }) => {
            let url = `/${this.entity_name}/page/${query.page}${query.search}`;
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
}
exports.Internal = Internal;