"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
vue_1.default.use(vue_router_1.default);
const spa_router_1 = require("../tasks/spa_router");
const spa_router_2 = require("../users/spa_router");
function createRouter() {
    return new vue_router_1.default({
        mode: 'history',
        routes: [
            ...spa_router_1.default,
            ...spa_router_2.default
        ]
    });
}
exports.createRouter = createRouter;
