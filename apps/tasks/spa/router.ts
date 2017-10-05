import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Hello from './vue/Hello.vue';
import Navi from './vue/Navi.vue';
import Page from './vue/Page.vue';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Router)

export function createRouter(options : createOptionsInterFace = createOptions){
    let opt = options;
    return new Router({
        mode: 'history',
        routes: [
            { path: `/${opt.entities}/`, components: { main : Page , navi : Navi } } as RouteConfig,
            { path: `/${opt.entities}/:id`, components: { main : Page , navi : Navi  } } as RouteConfig,
        ]
    })
}