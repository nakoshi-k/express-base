import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Hello from './vue/Hello.vue';
Vue.use(Router)

export function createRouter(){
    return new Router({
        routes: [
            { path: '/', name: 'hello', component: Hello } as RouteConfig
        ]
    })
}