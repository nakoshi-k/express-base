"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class resource {
    is_server() {
        if (typeof window === "undefined") {
            return true;
        }
        return false;
    }
}
exports.resource = resource;
