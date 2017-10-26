"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const moment = require("moment");
const mkdirp = require("mkdirp");
class logger {
    constructor() {
        this.exist = (path) => {
            const exist = (resolve, reject) => {
                fs.access(path, (err) => {
                    if (err) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            };
            return new Promise(exist);
        };
        this.mkdir = (file_path) => {
            let dir_stack = file_path.split(path.sep);
            dir_stack.pop();
            const dir = dir_stack.join(path.sep);
            let mkdir = (resolve, reject) => {
                mkdirp(dir, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(true);
                });
            };
            return new Promise(mkdir);
        };
        this.create = (path) => {
            const create = (resolve, reject) => {
                fs.writeFile(path, "", function (err) {
                    console.log(err);
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(true);
                });
            };
            return new Promise(create);
        };
        this.ready = (path) => __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.exist(path);
            if (!exist) {
                yield this.mkdir(path);
                yield this.create(path);
            }
            return true;
        });
        this.write = (path, content) => {
            const write = (resolve, reject) => {
                content.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ssZ");
                content.uuid = uuid.v4();
                const jsonString = JSON.stringify(content);
                const writeData = `, ${jsonString} \n`;
                fs.appendFile(path, writeData, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(true);
                });
            };
            return new Promise(write);
        };
    }
    get dir() {
        return [__dirname, "..", "logs"].join(path.sep);
    }
}
exports.logger = logger;
