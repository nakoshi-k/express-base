"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const ejs = require("ejs");
const fs = require("fs");
const helper_1 = require("../helper");
class crud_support_helper extends core_1.helper {
    constructor() {
        super();
        this._delete = "";
        this.load = () => {
            return new Promise((resolve, reject) => {
                this._delete = "aaa";
                let filePath = __dirname + "/../templates/delete.ejs";
                console.log(filePath);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    console.log(data);
                    if (err) {
                        resolve(false);
                        return;
                    }
                    this._delete = data;
                    resolve(true);
                });
            });
        };
        this.delete = (title, options = { path: "example", id: "id", csrf: "csrf", redirect: "redirect" }, linkOptions = { class: "button outline" }) => {
            var node_uuid = require('node-uuid');
            let uuid = node_uuid.v4().split("-").join("");
            let delFunc = "del_" + uuid + "()";
            let endPoint = options.path.replace("#", String(options.id));
            return this.tag.wrap("a", "delete", { href: "#", "onClick": delFunc, class: linkOptions.class }) + ejs.render(this._delete, { id: options.id,
                delFunc: delFunc,
                endPoint: endPoint,
                token: options.csrf,
                redirect: options.redirect
            });
        };
        this.tag = new helper_1.tag_helper();
        this.ejs_render = new helper_1.ejs_render_helper();
    }
}
exports.crud_support_helper = crud_support_helper;
