"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let domain = {
    host: "",
    entities: "tasks",
    entity: "task",
    request: {}
};
const { app, router, store } = app_1.createApp(domain);
if (window["__INITIAL_STATE__"]) {
    store.replaceState(window["__INITIAL_STATE__"]);
}
app.$mount("#application");
