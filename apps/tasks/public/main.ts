
import Vue from 'vue';
import VueRouter , {RouterOptions} from 'vue-router';
Vue.use(VueRouter);

import main from '../vue/main.vue';
import index from '../vue/index.vue';
import add from '../vue/add.vue';
import view from '../vue/view.vue';
import edit from '../vue/edit.vue';

let name = "tasks";

const routes = [
  { path: '/tasks/', 
    components: { default : index }
  },
  { path: '/tasks/page/:page/', 
    components: { default : index }
  },
  { path: '/tasks/add', 
    components: { default : add }
  },
  { path: '/tasks/:id', 
    components: { default : view }
  },
  { path: '/tasks/:id/edit', 
    components: { default : edit }
  }
]

const router  = new VueRouter({
  mode: 'history',
  routes: routes

})


const app = new Vue({
  router,
  template:"<tasks-main></tasks-main>",
  components : {"tasks-main":main}
}).$mount('#application');




