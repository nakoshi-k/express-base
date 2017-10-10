import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Hello from './vue/Hello.vue';
import Navi from './vue/Navi.vue';
import Page from './vue/Page.vue';
import Sub from './vue/Sub.vue';
import Add from './vue/Add.vue';
import View from './vue/View.vue';
import Edit from './vue/Edit.vue';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Router)

export function createRouter(options : createOptionsInterFace = createOptions){
    let opt = options;
    return new Router({
        mode: 'history',
        routes: [
            { name : "page" ,path: `/${opt.entities}/page/:page*`, components: { main : Page , navi : Navi ,sub : Sub } } as RouteConfig,
            { name : "index" ,path: `/${opt.entities}/page/1` , alias : `/${opt.entities}/` } as RouteConfig,
            { name : "add" , path: `/${opt.entities}/add`, components: { main : Add , navi : Navi ,sub : Sub } } as RouteConfig,
            { name : "view" , path: `/${opt.entities}/:id`, components: { main : View , navi : Navi ,sub : Sub } } as RouteConfig,
            { name : "edit" , path: `/${opt.entities}/:id/edit`, components: { main : Edit , navi : Navi ,sub : Sub } } as RouteConfig,
        ]
    })
}