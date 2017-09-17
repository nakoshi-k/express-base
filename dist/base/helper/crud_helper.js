"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const helper_1 = require("../helper");
class crud_helper extends core_1.helper {
    constructor() {
        super();
        this._deleteTemplate = "delete";
        this.loading = () => {
            this.cell.add("delete", this.deleteTemplate);
            return this.cell.ready();
        };
        this.delete = (title, options = { path: "example", id: "id", csrf: "csrf", redirect: "redirect" }, linkOptions = { class: "button outline" }) => {
            var node_uuid = require('node-uuid');
            let uuid = node_uuid.v4().split("-").join("");
            let delFunc = "del_" + uuid + "()";
            let endPoint = options.path.replace("#", String(options.id));
            let vars = {
                id: options.id,
                delFunc: delFunc,
                endPoint: endPoint,
                token: options.csrf,
                redirect: options.redirect
            };
            let s = this.tag.wrap("a", "delete", { href: "#", "onClick": delFunc, class: linkOptions.class });
            return s + this.cell.render("delete", vars);
        };
        this.tag = new helper_1.tag();
        this.cell = new helper_1.cell();
    }
    set deleteTemplate(path) {
        this._deleteTemplate = path;
    }
    get deleteTemplate() {
        return this._deleteTemplate;
    }
}
exports.crud_helper = crud_helper;
