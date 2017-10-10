import  Vue , {mixin,ComponentOptions } from 'vue';
import App from './vue/App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync'
import {createOptionsInterFace,createOptions} from "./Interface";

Vue.mixin({
  beforeMount () {
    const asyncData = this.$options["asyncData"];
    if (asyncData) {
      let loading = new Promise((resolve,reject) => {
          this.$store.commit("loading");
          resolve( asyncData({store: this.$store,route: this.$route}) );
      }).then(()=>{
        this.$store.commit("endLoading");
      }).catch((err) => {
        this.$store.commit("endLoading");
      })
      this["dataPromise"] = loading;
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      this.$store.commit("loading");
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        this.$store.commit("endLoading");
        next();
      }).catch(next)
    } else {
      next()
    }
  }

})


export function createApp(options : createOptionsInterFace = createOptions){
  const router = createRouter(options);
  const store = createStore(options);
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render : h => h(App)
  }) 
  return {app,router,store};
}

