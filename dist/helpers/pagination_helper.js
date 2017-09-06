"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_base_1 = require("./helper_base");
const common_1 = require("../common");
class pagination_helper extends helper_base_1.helper_base {
    constructor() {
        super();
        this.page = {};
        this.path = "example/$";
        this.build = (path, num) => {
            return path.replace("$", String(num));
        };
        this.start = (pagenationInterface, path) => {
            this.page = pagenationInterface;
            this.path = path;
            return this.tag.create("ul");
        };
        this.first = () => {
            let sep = common_1.config.sep;
            let router = this.attr.router;
            let link = this.tag.wrap("a", "first", { href: router + sep + 1 });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.prev = () => {
            let link = this.tag.wrap("a", "first", { href: "" });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.numbers = () => {
            return "";
        };
        this.next = () => {
            let link = this.tag.wrap("a", "first", { href: "" });
            return this.tag.wrap("li", link, { "class": "" });
        };
        this.last = () => {
            let link = this.tag.wrap("a", "last", { href: "" });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.end = () => {
            this.page = {};
            this.attr = {};
            return this.tag.create("/ul");
        };
        this.render = (pagenationInterface, option) => {
            let html = this.start(pagenationInterface, option);
            html += this.first();
            html += this.prev();
            html += this.numbers();
            html += this.next();
            html += this.last();
            html += this.end();
            return html;
        };
        this.load("tag"); //Tagヘルパーの呼び出し。
    }
}
module.exports = new pagination_helper();
