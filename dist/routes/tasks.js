"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("./router_base");
class tasks extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.index = (req, res, next) => {
            this.render(res, "index", { "title": "tanaka" });
        };
        this.bind = () => {
            this.get("/", this.index);
        };
    }
}
module.exports = new tasks().create();
