"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let rbac_config = {
    "/api/tasks": [
        { type: "get", route: "/", permission: ["*"] },
        { type: "get", route: "/page/:page", permission: ["*"] },
        { type: "get", route: "/:id", permission: ["*"] },
        { type: "post", route: "/", permission: ["*"] },
        { type: "put", route: "/:id", permission: ["*"] },
        { type: "delete", route: "/:id", permission: ["*"] }
    ],
    "/api/users": [
        { type: "get", route: "/", permission: ["*"] },
        { type: "get", route: "/page/:page", permission: ["*"] },
        { type: "get", route: "/:id", permission: ["*"] },
        { type: "post", route: "/", permission: ["*"] },
        { type: "put", route: "/:id", permission: ["*"] },
        { type: "delete", route: "/:id", permission: ["*"] }
    ]
};
class rbac {
    constructor() {
        this._default_access = "allow";
        this._role_field = "group_id";
        this.get_permission = (rbac, mount, route, method) => {
            if (!rbac) {
                return this.default;
            }
            if (!rbac[mount]) {
                return this.default;
            }
            let result = rbac[mount].filter(function (value, index) {
                return (value.type === method) && (value.route === route);
            });
            if (result.length === 0) {
                return this.default;
            }
            return result.pop().permission;
        };
        this.get_user_level = (req) => {
            if (!req.user) {
                return "gest";
            }
            return req.user[this.role_field];
        };
        this.check_permission = (permission, user_level) => {
            if (permission.length === 1) {
                if (permission[0] === "*") {
                    return true;
                }
                if (permission[0] === "-") {
                    return false;
                }
            }
            if (permission.indexOf(user_level) > -1) {
                return true;
            }
            return false;
        };
        this.mw = (req, res, next) => {
            let mount = req.baseUrl;
            let route = req.route.path;
            let method = req.method.toLowerCase();
            let permission = this.get_permission(rbac_config, mount, route, method);
            let user_level = this.get_user_level(req);
            if (!this.check_permission(permission, user_level)) {
                let err = new Error("Permission deny");
                next(err);
                return;
            }
            next();
        };
    }
    get role_field() {
        return this._role_field;
    }
    set role_field(field_name) {
        this._role_field = field_name;
    }
    set default_access(setting) {
        if (setting === "allow") {
            this._default_access = "allow";
        }
        this._default_access = "deny";
    }
    get default() {
        if (this._default_access === "allow") {
            return ["*"];
        }
        return ["-"];
    }
    create() {
        return this.mw;
    }
}
exports.rbac = rbac;
