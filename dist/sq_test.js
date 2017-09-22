"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("./models");
let a = models.tasks.rawAttributes;
for (let k in a) {
    console.log(a[k].type);
}
