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
        this.initAttr = (name, attr = {}) => {
            attr["name"] = name;
            if (attr["value"]) {
                return attr;
            }
            if (name in this.bindData) {
                attr["value"] = this.bindData[name];
                return attr;
            }
            return attr;
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
            attr = Object.assign(def, attr);
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
            attr = this.initAttr(name, attr);
            return this.tag.create("input", attr);
        };
        this.textarea = (name, attr = {}) => {
            attr = this.initAttr(name, attr);
            let innerContent = attr["value"];
            attr = this.removeAttr("value", attr);
            return this.tag.wrap("textarea", innerContent, attr);
        };
        this.removeAttr = (property, attr = {}) => {
            if (attr.hasOwnProperty(property)) {
                delete attr[property];
            }
            return attr;
        };
        this.selector = (name, options = {}, attr = {}) => {
            let build = (type) => {
                let tag = "";
                let childAttr = {};
                let flg = (type === "radio") ? "checked" : "selected";
                for (let key in options) {
                    childAttr["value"] = key;
                    if (attr["value"] + "" === key) {
                        childAttr[flg] = flg;
                    }
                    if (type === "select") {
                        tag += this.tag.wrap("option", options[key], childAttr);
                        continue;
                    }
                    if (type === "radio") {
                        childAttr["type"] = "radio";
                        tag += this.input(name, childAttr);
                        continue;
                    }
                }
                return tag;
            };
            let selector = {
                select: () => {
                    return build("select");
                },
                radio: () => {
                    return build("radio");
                }
            };
            return selector;
        };
        this.radio = (name, options = {}, attr = {}) => {
            let childAttr = {};
            return this.selector(name, options, attr).radio();
        };
        this.select = (name, options = {}, attr = {}) => {
            attr = this.initAttr(name, attr);
            let tag = this.selector(name, options, attr).select();
            attr = this.removeAttr("value", attr);
            return this.tag.wrap("select", tag, attr);
        };
        this.checkbox = (name, attr = {}) => {
            attr = this.initAttr(name, attr);
            attr["type"] = "checkbox";
            return this.tag.create("input", attr);
        };
        this.file = (name, attr) => {
            attr = this.initAttr(name, attr);
            attr["type"] = "file";
            this.input(name, attr);
        };
        this.load("tag"); //Tagヘルパーの呼び出し。
        this.bindData = {};
    }
}
module.exports = new form_helper();