"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../base/core");
const core_2 = require("../base/core");
const helpers = require("../base/helper");
class router extends core_1.router {
    constructor() {
        super();
        this.name = "router";
        this.parent = {};
        this.views = {
            common: __dirname + core_2.system.ds + "views",
            typical: __dirname
        };
        let crud = new helpers.crud();
        let path = [__dirname, "views", "crud", "delete.ejs"].join(core_2.system.ds);
        crud.deleteTemplate = path;
        this.helper("crud", crud);
    }
}
exports.router = router;
