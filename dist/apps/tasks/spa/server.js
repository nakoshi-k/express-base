"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
exports.default = context => {
    let server = (resolve, reject) => {
        const { app, router } = app_1.createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                reject({ code: 404 });
            }
            resolve(app);
        }, reject);
    };
    return new Promise(server);
};
