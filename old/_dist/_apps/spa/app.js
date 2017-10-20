"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const app_vue_1 = require("./components/app.vue");
const router_1 = require("./router");
const store_1 = require("./store");
const vuex_router_sync_1 = require("vuex-router-sync");
vue_1.default.mixin({
    beforeMount() {
        const asyncData = this.$options["asyncData"];
        if (asyncData) {
            let ad = Promise.resolve(this.$store.commit("loading/loading", "success"));
            ad.then(() => asyncData({ store: this.$store, route: this.$route }))
                .then(res => {
                setTimeout(() => {
                    this.$store.commit("loading/endLoading", "success");
                }, 240);
            }).catch(err => {
                let domain = this.$store.state["domain"];
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
function createApp(server) {
    const router = router_1.createRouter();
    const store = store_1.createStore(server);
    vuex_router_sync_1.sync(store, router);
    const app = new vue_1.default({
        router,
        store,
        render: h => h(app_vue_1.default)
    });
    return { app, router, store };
}
exports.createApp = createApp;
