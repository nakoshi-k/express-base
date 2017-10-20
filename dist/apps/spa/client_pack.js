"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const { app, router, store } = application_1.createApp({ host: "", request: {} });
if (window["__INITIAL_STATE__"]) {
    store.replaceState(window["__INITIAL_STATE__"]);
}
app.$mount("#application");
