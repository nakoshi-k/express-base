import Vue , {mixin,ComponentOptions } from 'vue';
import App from './vue/App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync'
import {createOptionsInterFace,createOptions} from "./Interface";

  Vue.mixin({
    beforeMount () {
      let alias :any = this;
      const { asyncData } = alias.$options;

      if (asyncData) {

        alias.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        })
  
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(23);
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
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

