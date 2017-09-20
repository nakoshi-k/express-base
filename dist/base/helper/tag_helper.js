"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class tag_helper extends core_1.helper {
    constructor() {
        super(...arguments);
        this.buildAttr = (attr) => {
            let attribute = "";
            for (let key in attr) {
                if (attr[key] === "") {
                    continue;
                }
                attribute += ` ${key}="${attr[key]}"`;
            }
            return attribute;
        };
        this.create = (tagName, attr = {}) => {
            return `<${tagName}${this.buildAttr(attr)}>`;
        };
        this.wrap = (tagName, content = "", attr = {}) => {
            content = (content === null) ? "" : content;
            let tag = `
                ${this.create(tagName, attr)}
                    ${content}
                ${this.create("/" + tagName)}  
            `;
            return tag;
        };
    }
}
exports.tag_helper = tag_helper;
