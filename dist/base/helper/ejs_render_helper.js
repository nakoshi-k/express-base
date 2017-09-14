"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const ejs = require("ejs");
const core_2 = require("../core");
class ejs_render_helper extends core_1.helper {
    constructor() {
        super();
        this.rendering = () => {
            let template = this.views + this.template + ".ejs";
            let vars = this.vars;
            let opt = {};
            let rendering = new Promise((resolve, reject) => {
                ejs.renderFile(template, vars, opt, (err, str) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(str);
                });
            });
            return rendering;
        };
        this.render = (path, vars) => {
            this.template = path;
            this.vars = vars;
            return ejs.render("<%= >");
        };
        this.ejs = require("ejs");
        let views = [__dirname];
        views.push("..");
        views.push("templates");
        this.views = views.join(core_2.config.sep) + core_2.config.sep;
    }
    set template(path) {
        this._template = path;
    }
    get template() {
        return this._template;
    }
    get vars() {
        return this._vars;
    }
    set vars(vars) {
        this._vars = vars;
    }
    get views() {
        return this._views;
    }
    set views(views) {
        this._views = views;
    }
}
exports.ejs_render_helper = ejs_render_helper;
