"use strict";
class router_base {
    constructor() {
        this.create = () => {
            this.bind();
            return this.router;
        };
        this.get = (rute, func) => {
            this.router.get(rute, func);
        };
        this.post = (rute, func) => {
            this.router.post(rute, func);
        };
        let express = require('express');
        let router = express.Router();
        let path = require("path");
        this.path = path;
        this.router = router;
    }
    bind() {
        let router = this.router;
    }
    render(res, view = "index", vars = {}) {
        let f = view.substring(1, 1);
        let sep = this.path.sep;
        if (f !== "." && f !== "/") {
            view = this.name + sep + view;
        }
        console.log(view);
        res.render(view, { vars });
    }
}
exports.router_base = router_base;
