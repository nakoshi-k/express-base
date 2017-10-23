"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class client_fetch {
    constructor() {
        this._options = {
            credentials: 'same-origin',
            method: "get",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        };
        this.fetch = (url, options) => {
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
    }
    get options() {
        return Object.create(this._options);
    }
}
exports.client_fetch = client_fetch;
