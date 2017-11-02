"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
class route_parse extends utility_1.utility {
    parse(route) {
        let params = route.params;
        let paramsStr = "";
        for (let key in params) {
            paramsStr = `${key}/${params[key]}`;
        }
        return paramsStr;
    }
}
exports.default = new route_parse();
