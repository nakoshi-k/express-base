import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import hello from './components/hello.vue';
import navi from './components/navi.vue';
import sub from '../tasks/components/sub.vue';
import page from '../tasks/components/page.vue';
import add from '../tasks/components/add.vue';
import view from '../tasks/components/view.vue';
import edit from '../tasks/components/edit.vue';
import {createOptionsInterFace,createOptions} from "./interface/interface";
Vue.use(Router)

export function createRouter(){
    return new Router({
        mode: 'history',
        routes: [
            { name : "page" ,path: `/tasks/page/:page*`, components: { main : page , navi : navi ,sub : sub } } as RouteConfig,
            { name : "index" ,path: `/tasks/page/1` , alias : `/tasks/` } as RouteConfig,
            { name : "add" , path: `/tasks/add`, components: { main : add , navi : navi ,sub : sub } } as RouteConfig,
            { name : "view" , path: `/tasks/:id`, components: { main : view , navi : navi ,sub : sub } } as RouteConfig,
            { name : "edit" , path: `/tasks/:id/edit`, components: { main : edit , navi : navi ,sub : sub } } as RouteConfig,
        ]
    })
}