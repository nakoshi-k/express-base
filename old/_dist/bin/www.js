"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const app_1 = require("../app");
let app = new app_1.main();
app.ready().then((res) => {
    new server_1.server(res, 4000);
});
