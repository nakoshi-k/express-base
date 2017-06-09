"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_base_1 = require("./helper_base");
class form_helper extends helper_base_1.helper_base {
    constructor() {
        super();
        this.bindData = {};
        this.bind = (bindData = {}) => {
            this.bindData = Object.assign(this.bindData, bindData);
        };
        this.unBind = () => {
            this.bindData = {};
        };
        this.csrf = (token) => {
            return this.tag.create("input", { name: "_csrf", value: token, type: "hidden" });
        };
        this.start = (name, bindData, attr = {}) => {
            this.bind(bindData);
            let def = {
                method: "post",
                action: ""
            };
            let csrfTag = "";
            if ("csrf" in this.bindData) {
                csrfTag = this.csrf(this.bindData["csrf"]);
            }
            attr["name"] = name;
            for (let key in def) {
                if (key in attr) {
                    continue;
                }
                attr[key] = def[key];
            }
            return this.tag.create("form", attr) + csrfTag;
        };
        this.end = () => {
            this.unBind();
            return this.tag.create("/form");
        };
        this.submit = (title, attr = { class: "button primary" }) => {
            return this.tag.wrap("button", title, attr);
        };
        this.input = (name, attr = {}) => {
            attr["name"] = name;
            if ("value" in attr) {
                return this.tag.create("input", attr);
            }
            if (name in this.bindData) {
                attr["value"] = this.bindData[name];
            }
            return this.tag.create("input", attr);
        };
        this.textarea = (name, attr = {}) => {
            attr["name"] = name;
            let innerContent = "";
            if ("value" in attr) {
                innerContent = attr["value"];
                delete attr["value"];
                return this.tag.wrap("textarea", innerContent, attr);
            }
            if (name in this.bindData) {
                innerContent = this.bindData[name];
            }
            delete attr["value"];
            return this.tag.wrap("textarea", innerContent, attr);
        };
        this.radio = (name, options, attr) => {
        };
        this.select = (name, options, attr) => {
        };
        this.file = (name, attr) => {
        };
        this.load("tag"); //Tagヘルパーの呼び出し。
        this.bindData = {};
    }
}
module.exports = new form_helper();
