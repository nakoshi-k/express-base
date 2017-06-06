"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("./router_base");
class tasks extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.search = (req, res, next) => {
            this.render(res, "index", { "title": "tanaka" });
        };
        this.entry = (req, res, next) => {
            this.csfr(req);
            this.render(res, "entry");
        };
        this.bind = () => {
            let router = this.router;
            router.get("/", this.search);
            router.get("/entry", this.entry);
            router.post("/entry", this.entry);
        };
    }
}
module.exports = new tasks().create();
