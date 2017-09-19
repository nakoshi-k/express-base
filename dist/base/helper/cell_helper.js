"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const ejs = require("ejs");
const fs = require("fs");
class cell_helper extends core_1.helper {
    constructor() {
        super(...arguments);
        this._templates = {};
        this._vars = {};
        this.read = (name, path) => {
            return new Promise((resolve, reject) => {
                let filePath = path;
                if (path.charAt(0) !== "/" && path.charAt(0) !== "\\") {
                    let ds = core_1.system.ds;
                    filePath = __dirname + ds + ".." + ds + "views" + ds + "tile" + ds + path + ".ejs";
                }
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        resolve({ path: filePath, status: false });
                        return;
                    }
                    this._templates[name]["entity"] = data;
                    resolve({ path: filePath, status: true });
                });
            });
        };
        this.ready = () => {
            let all = [];
            let templates = this._templates;
            Object.keys(templates).forEach((key) => {
                all.push(this.read(key, templates[key].path));
            });
            return Promise.all(all);
        };
        this.render = (name = "", vars = {}) => {
            if (name === "") {
                return "";
            }
            let templateEntity = this._templates[name].entity;
            if (typeof templateEntity === "undefined") {
                return "";
            }
            return ejs.render(templateEntity, vars);
        };
    }
    get templates() {
        return this._templates;
    }
    set templates(paths) {
        this._templates = paths;
    }
    add(name, path = "") {
        this._templates[name] = { path: path };
        if (path === "") {
            this._templates[name] = { path: name };
        }
    }
}
exports.cell_helper = cell_helper;
