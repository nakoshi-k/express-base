"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class build_query {
    http(query) {
        let prts = query;
        if (prts.length === 0) {
            return "";
        }
        let q = "";
        Object.keys(prts).forEach(function (key) {
            if (!prts[key]) {
                return;
            }
            q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
        });
        return q.replace("&", "?");
    }
}
exports.build_query = build_query;
