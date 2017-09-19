"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const helper_1 = require("../helper");
class form_helper extends core_1.helper {
    constructor() {
        super();
        this.bindData = {};
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
            if (token === "") {
                return "";
            }
            return this.tag.create("input", { name: "_csrf", value: token, type: "hidden" });
        };
        this.action = (action) => {
            action = action.replace(":id", this.bindData.id);
            return action;
        };
        this.start = (name, bindData = {}, attr = { method: "post", action: "" }) => {
            this.bind = bindData;
            attr["name"] = name;
            let method = "";
            if (attr.method !== "post" && attr.method !== "get") {
                method = this.method(attr.method);
                attr.method = "post";
            }
            attr.action = this.action(attr.action);
            let form = this.tag.create("form", attr);
            form += method;
            form += this.csrf(this.bindData.csrf);
            return form;
        };
        this.end = () => {
            this.unBind();
            return this.tag.create("/form");
        };
        this.validationError = (name, element) => {
            if (!this.bind["errors"]) {
                return this.tag.wrap("div", element, { class: "input" });
            }
            if (!this.bind["errors"][name]) {
                return this.tag.wrap("div", element, { class: "input" });
            }
            let vdt = this.bind["errors"][name];
            for (let i = 0; i < vdt.length; i++) {
                element += this.tag.wrap("div", vdt[i]["message"], { "class": "error", "data-validation": vdt[i]["type"] });
            }
            return this.tag.wrap("div", element, { class: "input error" });
        };
        this.postProcess = (name, element) => {
            element = this.validationError(name, element);
            return element;
        };
        this.submit = (title, attr = { class: "button primary" }) => {
            return this.tag.wrap("button", title, attr);
        };
        this.input = (name, attr = {}) => {
            if (!attr["type"]) {
                attr["type"] = "text";
            }
            attr = this.initAttr(name, attr);
            if (attr["type"] === "hidden") {
                return this.tag.create("input", attr);
            }
            return this.postProcess(name, this.tag.create("input", attr));
        };
        this.textarea = (name, attr = {}) => {
            attr = this.initAttr(name, attr);
            let innerContent = attr["value"];
            attr = this.removeAttr("value", attr);
            return this.postProcess(name, this.tag.wrap("textarea", innerContent, attr));
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
            return this.postProcess(name, this.selector(name, options, attr).radio());
        };
        this.select = (name, options = {}, attr = {}) => {
            attr = this.initAttr(name, attr);
            let tag = this.selector(name, options, attr).select();
            attr = this.removeAttr("value", attr);
            return this.postProcess(name, this.tag.wrap("select", tag, attr));
        };
        this.checkbox = (name, attr = {}) => {
            attr = this.initAttr(name, attr);
            attr["type"] = "checkbox";
            return this.postProcess(name, this.tag.create("input", attr));
        };
        this.file = (name, attr) => {
            attr = this.initAttr(name, attr);
            attr["type"] = "file";
            return this.postProcess(name, this.input(name, attr));
        };
        this.method = (name) => {
            return this.input("_method", { type: "hidden", value: name });
        };
        this.tag = new helper_1.tag();
        this.bindData = { csrf: "" };
    }
    set bind(bindData) {
        this.bindData = Object.assign(this.bindData, bindData);
    }
    get bind() {
        return this.bindData;
    }
}
exports.form_helper = form_helper;
