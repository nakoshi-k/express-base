"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const logger_1 = require("./logger");
let logger = new logger_1.logger();
class logger_users {
    constructor() {
        this.user_log_path = (user_id) => {
            return path.resolve([logger.dir, "users"].join(path.sep) + path.sep + user_id + ".log");
        };
        this.access_log = (user_id, action) => {
            let file_path = this.user_log_path(user_id);
            file_path = path.resolve(file_path);
            let content = {
                action: action,
                user_id: user_id
            };
            return logger.ready(file_path).then(r => logger.write(file_path, content)).catch(e => {
                console.log(e);
            });
        };
        this.read_file = (path) => {
            const read_file = (resolve, reject) => {
                fs.readFile(path, "utf-8", (err, text) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(text);
                });
            };
            return new Promise(read_file);
        };
        this.get_user_log = (user_id, action) => {
            const get_user_log = (resolve, reject) => {
                this.users_log(user_id).then((r) => {
                    let result = r.filter(function (item, index) {
                        return item.action === action;
                    });
                    resolve(result);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(get_user_log);
        };
    }
    users_log(user_id) {
        let file_path = this.user_log_path(user_id);
        const users_log = (resolve, reject) => {
            this.read_file(file_path).then(text => {
                let add_blanket = "[" + text.replace(",", "") + "]";
                let log_json = JSON.parse(add_blanket);
                resolve(log_json);
            }).catch(e => {
                reject(e);
            });
        };
        return new Promise(users_log);
    }
}
exports.logger_users = logger_users;
