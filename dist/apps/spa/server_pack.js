"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.default = context => {
    let server = (resolve, reject) => {
        let feeds = context.feeds;
        const { app, router, store } = application_1.createApp(feeds);
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                reject(app);
                return;
            }
            Promise.all(matchedComponents.map((Component) => {
                if (Component.asyncData) {
                    store.commit("loading");
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
                if (!Component.extendOptions) {
                    return;
                }
                if (Component.extendOptions.asyncData) {
                    store.commit("loading/loading");
                    return Component.extendOptions.asyncData({
                        store, route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(e => {
                resolve(app);
            });
        }, reject);
    };
    return new Promise(server);
};