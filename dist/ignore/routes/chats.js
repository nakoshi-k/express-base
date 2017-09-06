"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("./router_base");
class chats extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "chats";
        this.index = (req, res, next) => {
            this.render(req, res, "index");
        };
        this.beforeRender = (req, res) => {
            this.loadHelper("form");
            this.csrfReady(req);
        };
        this.bind = () => {
            let router = this.router;
            let csrfProtection = this.csrfProtection;
            let parseForm = this.parseForm;
            router.get("/", csrfProtection, this.index);
        };
    }
}
exports.chats = chats;
exports.router = new chats().create();
