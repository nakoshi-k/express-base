"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./vue/App.vue");
const router_1 = require("./router");
const store_1 = require("./store");
const vuex_router_sync_1 = require("vuex-router-sync");
const Interface_1 = require("./Interface");
vue_1.default.mixin({
    beforeMount() {
        const asyncData = this.$options["asyncData"];
        if (asyncData) {
            let loading = new Promise((resolve, reject) => {
                this.$store.commit("loading");
                resolve(asyncData({ store: this.$store, route: this.$route }));
            }).then(() => {
                this.$store.commit("endLoading");
            }).catch((err) => {
                this.$store.commit("endLoading");
            });
            this["dataPromise"] = loading;
        }
    },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            this.$store.commit("loading");
            asyncData({
                store: this.$store,
                route: to
            }).then(() => {
                this.$store.commit("endLoading");
                next();
            }).catch(next);
        }
        else {
            next();
        }
    }
});
function createApp(options = Interface_1.createOptions) {
    const router = router_1.createRouter(options);
    const store = store_1.createStore(options);
    vuex_router_sync_1.sync(store, router);
    const app = new vue_1.default({
        router,
        store,
        render: h => h(App_vue_1.default)
    });
    return { app, router, store };
}
exports.createApp = createApp;
