"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_fetch_1 = require("./client_fetch");
const resource_1 = require("./resource");
let client = new client_fetch_1.client_fetch();
class auth extends resource_1.resource {
    constructor(options) {
        super();
        this.end_point = "/api/users";
        this.login = (user, token) => {
            let login = (resolve, reject) => {
                let url = this.end_point + "/login";
                let opt = {
                    body: JSON.stringify(user),
                    method: "post",
                    headers: {
                        "X-XSRF-Token": token
                    }
                };
                client.fetch(url, opt).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(login);
        };
        this.user_client = () => {
            let user = (resolve, reject) => {
                let url = this.end_point + "/auth";
                client.fetch(url, {}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject("login user undefined");
                });
            };
            return new Promise(user);
        };
        this.user_server = () => {
            let user_server = (resolve, reject) => {
                if (this.feeds.user["id"]) {
                    resolve(this.feeds.user);
                    return;
                }
                reject("login user undefined");
            };
            return new Promise(user_server);
        };
        this.user = () => {
            if (this.is_server()) {
                return this.user_server();
            }
            return this.user_client();
        };
        this.logout = () => {
            let logout = (resolve, reject) => {
                let url = this.end_point + "/logout";
                client.fetch(url, {}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(logout);
        };
        this.feeds = options.feeds;
    }
}
exports.auth = auth;
