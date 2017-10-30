"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rbac = {
    "api": {
        "tasks": [
            { type: "get", mount: "/" },
            { type: "get", mount: "/page/:page" },
            { type: "get", mount: "/:id" },
            { type: "post", mount: "/" },
            { type: "put", mount: "/:id" },
            { type: "delete", mount: "/:id" }
        ],
        "users": {
            "search": "*",
            "entity": "*",
            "update": "*",
            "insert": "*",
            "login": "*",
            "logout": "*"
        }
    }
};
