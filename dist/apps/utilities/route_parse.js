"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class route_parse {
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
