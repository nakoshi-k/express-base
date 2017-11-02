"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const app_vue_1 = require("./app.vue");
const client_router_1 = require("./client_router");
const store_1 = require("./store");
const vuex_router_sync_1 = require("vuex-router-sync");
vue_1.default.mixin({
    beforeMount() {
        const asyncData = this.$options["asyncData"];
        if (asyncData) {
            let ad = Promise.resolve(this.$store.commit("loading/loading", "success"));
            ad.then(() => asyncData({ store: this.$store, route: this.$route }))
                .then(res => {
                if (this["resolveAsyncData"]) {
                    this["resolveAsyncData"]();
                }
                setTimeout(() => {
                    this.$store.commit("loading/endLoading", "success");
                }, 240);
            }).catch(err => {
                console.log(err);
                this.$router.push({ path: `/tasks` });
            });
            this["dataPromise"] = ad;
        }
    },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            this.$store.commit("loading/loading", "success");
            asyncData({
                store: this.$store,
                route: to
            }).then(() => {
                if (this["resolveAsyncData"]) {
                    this["resolveAsyncData"]();
                }
                setTimeout(() => {
                    this.$store.commit("loading/endLoading", "success");
                }, 240);
                next();
            }).catch(next);
        }
        else {
            next();
        }
    }
});
function createApp(feeds) {
    const router = client_router_1.createRouter();
    const store = store_1.createStore(feeds);
    vuex_router_sync_1.sync(store, router);
    const app = new vue_1.default({
        router,
        store,
        render: h => h(app_vue_1.default)
    });
    return { app, router, store };
}
exports.createApp = createApp;
