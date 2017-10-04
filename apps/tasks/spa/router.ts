import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Hello from './vue/Hello.vue';
import Navi from './vue/Navi.vue';
import Resource from './vue/Resource.vue';
Vue.use(Router)


export function createRouter(){
    return new Router({
        mode: 'history',
        routes: [
            { path: '/tasks/', components: { default : Resource , navi : Navi  } } as RouteConfig,
            { path: '/tasks/:id', components: { default : Resource , navi : Navi  } } as RouteConfig,
        ]
    })
}