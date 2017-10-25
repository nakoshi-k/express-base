"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_fetch_1 = require("./client_fetch");
let client = new client_fetch_1.client_fetch();
class auth {
    constructor() {
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
        this.user = () => {
            let user = (resolve, reject) => {
                let url = this.end_point + "/auth";
                client.fetch(url, {}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(user);
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
    }
}
exports.auth = auth;
