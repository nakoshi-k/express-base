import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import hello from './components/hello.vue';
import navi from './components/navi.vue';
import sub from './components/sub.vue';
import page from '../tasks/components/page.vue';
import add from '../tasks/components/add.vue';
import view from '../tasks/components/view.vue';
import edit from '../tasks/components/edit.vue';
import {createOptionsInterFace,createOptions} from "./interface/interface";
Vue.use(Router)

export function createRouter(options : createOptionsInterFace = createOptions){
    let opt = options;
    return new Router({
        mode: 'history',
        routes: [
            { name : "page" ,path: `/${opt.entities}/page/:page*`, components: { main : page , navi : navi ,sub : sub } } as RouteConfig,
            { name : "index" ,path: `/${opt.entities}/page/1` , alias : `/${opt.entities}/` } as RouteConfig,
            { name : "add" , path: `/${opt.entities}/add`, components: { main : add , navi : navi ,sub : sub } } as RouteConfig,
            { name : "view" , path: `/${opt.entities}/:id`, components: { main : view , navi : navi ,sub : sub } } as RouteConfig,
            { name : "edit" , path: `/${opt.entities}/:id/edit`, components: { main : edit , navi : navi ,sub : sub } } as RouteConfig,

        ]
    })
}