import  Vue , {mixin,ComponentOptions } from 'vue';
import App from './components/app.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync'
import {createOptionsInterFace,createOptions} from "./interface/interface";

Vue.mixin({
  beforeMount () {
    const asyncData = this.$options["asyncData"];
    if (asyncData) {
      let ad = Promise.resolve(this.$store.commit("loading/loading" , "success"));
      ad.then( () => asyncData({store: this.$store,route: this.$route}) )
      .then(res => {
        setTimeout(() => {
          this.$store.commit("loading/endLoading" , "success");
        },240)
      }).catch(err => {
        let domain = this.$store.state["domain"];
        this.$router.push({path : `/tasks`});
      });
      this["dataPromise"] = ad;
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      this.$store.commit("loading/loading" , "success");
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        setTimeout(() => {
          this.$store.commit("loading/endLoading" , "success");
        },240)
        next();
      }).catch(next)
    } else {
      next()
    }
  }
})


export function createApp(server){
  const router = createRouter();
  const store = createStore(server);
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render : h => h(App)
  }) 
  return {app,router,store};
}

