"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_base_1 = require("./helper_base");
class tag_helper extends helper_base_1.helper_base {
    constructor() {
        super(...arguments);
        this.buildAttr = (attr) => {
            let attribute = "";
            for (let key in attr) {
                attribute += " " + key + '="' + attr[key] + '"';
            }
            return attribute;
        };
        this.create = (tagName, attr = {}) => {
            return "<" + tagName + this.buildAttr(attr) + ">";
        };
        this.wrap = (tagName, content = "", attr = {}) => {
            let tag = "";
            content = (content === null) ? "" : content;
            tag += this.create(tagName, attr) + "\n";
            tag += content + "\n";
            tag += this.create("/" + tagName);
            return tag;
        };
    }
}
module.exports = new tag_helper();
