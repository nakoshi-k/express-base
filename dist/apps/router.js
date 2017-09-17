"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const core_2 = require("../base/core");
class router extends core_1.router {
    constructor() {
        super();
        this.name = "router";
        this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname + core_2.system.ds
        };

        
    }
}
exports.router = router;

