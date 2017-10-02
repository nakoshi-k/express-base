import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Hello from './vue/hello.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    } as RouteConfig
  ]
})