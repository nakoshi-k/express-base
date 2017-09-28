
import Vue from 'vue';
import VueRouter , {RouterOptions} from 'vue-router';
Vue.use(VueRouter);

import index from '../vue/index.vue';
import sub from '../vue/sub.vue';
//import view from '../vue/view.vue';
//import {pagination} from "../../../base/helper";
let name = "tasks";
let body = document.getElementsByTagName("body")[0];
let csrfToken = body.attributes["data-csrf-token"].value;

const Foo = { template: sub }
const Bar = { template: '<div>bar</div>' }


const routes = [
  { path: '/tasks/', component: index},
  { path: '/tasks/add', component: add},
  { path: '/tasks/:id', component: view},
  { path: '/tasks/:id/edit', component: edit}
]

const router  = new VueRouter({
  mode: 'history',
  routes: routes,
})

//console.log(router);


const app = new Vue({
  router
}).$mount('#application');




