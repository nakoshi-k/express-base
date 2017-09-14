"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const helper_1 = require("../helper");
class paginationConfig {
    constructor() {
        this.wrap = { tag: "nav", tagClass: "pagination" };
        this.parent = { tag: "ul", tagClass: "pagination-list" };
        this.child = { tag: "li", tagClass: "", linkClass: "" };
        this.disable = { tagClass: "disable", innerTag: "a", innerClass: "disable" };
        this.prev = { tagClass: "prev", innerTag: "span", innerClass: "" };
        this.next = { tagClass: "next", innerTag: "span", innerClass: "" };
        this.first = { tagClass: "first", innerTag: "span", innerClass: "" };
        this.last = { tagClass: "last", innerTag: "span", innerClass: "" };
        this.active = { tagClass: "active", innerTag: "a", innerClass: "" };
        this.text = { first: "&laquo; First", last: "Last &raquo;", prev: "&lsaquo; Prev", next: "Next &rsaquo;" };
    }
}
class pagination_helper extends core_1.helper {
    constructor() {
        super();
        this.page = {};
        this.path = "/page/#";
        this.start = (pagenationInterface, path) => {
            this.page = pagenationInterface;
            this.path = path;
        };
        this.buildPath = (path, innerText) => {
            this.appendQuery();
            return path.replace("#", innerText) + this.appendQuery();
        };
        this.buildLinkTag = (innerText, pageNum) => {
            let path = this.path;
            let child = this.config.child;
            let linkOpt = { href: this.buildPath(path, String(pageNum)), class: child.linkClass };
            let link = this.tag.wrap("a", innerText, linkOpt);
            return link;
        };
        this.buildDisableTag = (innerText, pageNum) => {
            let disable = this.config.disable;
            let Opt = { class: disable.innerClass };
            let link = this.tag.wrap(disable.innerTag, innerText, Opt);
            return link;
        };
        this.buildAvtiveTag = (innerText, pageNum) => {
            let active = this.config.active;
            let Opt = { href: "#", class: active.innerClass };
            let link = this.tag.wrap(active.innerTag, innerText, Opt);
            return link;
        };
        this.isActive = (pageNum) => {
            if (this.page.currentPage === pageNum) {
                return true;
            }
            return false;
        };
        this.special = (name, disableCondition = false, pageNum) => {
            if (this.page.totalPage === 0) {
                return "";
            }
            let innerText = this.config.text[name];
            let tag = this.buildLinkTag(innerText, pageNum);
            let addClass = this.config[name].tagClass;
            if (disableCondition) {
                tag = this.buildDisableTag(innerText, pageNum);
                addClass += " " + this.config.disable.tagClass;
            }
            return "\n" + this.buildChild(tag, addClass);
        };
        this.first = () => {
            let disableCondition = (this.page.currentPage === 1);
            return this.special("first", disableCondition, 1);
        };
        this.last = () => {
            let lastPage = this.page.totalPage;
            let disableCondition = (this.page.currentPage === lastPage);
            return this.special("last", disableCondition, lastPage);
        };
        this.prev = () => {
            let prevPage = this.page.currentPage - 1;
            let disableCondition = (prevPage < 1);
            return this.special("prev", disableCondition, prevPage);
        };
        this.next = () => {
            let nextPage = this.page.currentPage + 1;
            let disableCondition = (nextPage > this.page.totalPage);
            return this.special("next", disableCondition, nextPage);
        };
        this.numbers = () => {
            let source = "";
            let c = this.page.totalPage;
            for (let i = 1; i <= c; i++) {
                let link = this.buildLinkTag(String(i), i);
                let addClass = "";
                if (this.isActive(i)) {
                    link = this.buildAvtiveTag(String(i), i);
                    addClass = this.config.active.tagClass;
                }
                source += "\n" + this.buildChild(link, addClass);
            }
            return source;
        };
        this.end = () => {
            this.page = {};
        };
        this.wrap = (source) => {
            if (this._config.wrap) {
                let conf = this._config.wrap;
                source = this.tag.wrap(conf.tag, source, { class: conf.tagClass });
            }
            return source;
        };
        this.render = (pagenationInterface, option = { path: "/page/#" }) => {
            this.start(pagenationInterface, option.path);
            let html = "";
            html += this.first();
            html += this.prev();
            html += this.numbers();
            html += this.next();
            html += this.last();
            let parent = this._config.parent;
            html = this.tag.wrap(parent.tag, html, { class: parent.tagClass });
            return this.wrap(html);
        };
        this.tag = new helper_1.tag_helper();
        this.config = new paginationConfig();
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    appendQuery() {
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
    buildChild(innerText, addClass = "") {
        let child = this.config.child;
        addClass = (addClass === "") ? "" : " " + addClass;
        let cssClass = child.linkClass + addClass;
        return this.tag.wrap(child.tag, innerText, { class: cssClass.trim() });
    }
}
exports.pagination_helper = pagination_helper;
