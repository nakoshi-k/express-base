"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_base_1 = require("./helper_base");
const common_1 = require("../common");
class pagination_helper extends helper_base_1.helper_base {
    constructor() {
        super();
        this.page = {};
        this.path = "example/#";
        this.build = (path, num) => {
            this.appendQuery();
            return path.replace("#", String(num)) + this.appendQuery();
        };
        this.start = (pagenationInterface, path) => {
            this.page = pagenationInterface;
            this.path = path;
            return this.tag.create("ul");
        };
        this.first = () => {
            let sep = common_1.config.sep;
            let path = this.path;
            let link = this.tag.wrap("a", "first", { href: this.build(path, 1) });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.prev = () => {
            let path = this.path;
            let link = this.tag.wrap("a", "prev", { href: this.build(path, 1) });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.numbers = () => {
            return "";
        };
        this.next = () => {
            let link = this.tag.wrap("a", "next", { href: "" });
            return this.tag.wrap("li", link, { "class": "" });
        };
        this.last = () => {
            let link = this.tag.wrap("a", "last", { href: "" });
            return this.tag.wrap("li", link, { class: "" });
        };
        this.end = () => {
            this.page = {};
            return this.tag.create("/ul");
        };
        this.render = (pagenationInterface, option = { path: "aaa/#" }) => {
            let html = this.start(pagenationInterface, option.path);
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
    appendQuery() {
        //encodeURIComponent(JSON.stringify(object_to_be_serialised))
        let prts = this.page.queryPrams;
        if (prts.length === 0) {
            return "";
        }
        let q = "";
        Object.keys(prts).forEach(function (key) {
            q += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(prts[key]);
        });
        return q.replace("&", "?");
    }
}
module.exports = new pagination_helper();
