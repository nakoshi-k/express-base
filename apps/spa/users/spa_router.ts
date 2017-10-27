import Router, { RouteConfig } from 'vue-router'
const navigation = () => import ('../navigation/components/navigation.vue')
const sub = () => import('./components/sub.vue')
const idx = () => import('./components/idx.vue')
const add = () => import('./components/add.vue')
const view = () => import('./components/view.vue')
const edit = () => import('./components/edit.vue')
const login = () => import('./components/login.vue')
const mount = "/users"
export default [
    { name : "users_login",path: `${mount}/login`, components: { single : login } } as RouteConfig,
    { name : "users_page" ,path: `${mount}/page/:page*`, components: { main : idx , navi : navigation,sub : sub } } as RouteConfig,
    { name : "users_index" ,path: `${mount}/page/1` , alias : `${mount}/` } as RouteConfig,
    { name : "users_add" , path: `${mount}/add`, components: { main : add , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "users_view" , path: `${mount}/:id`, components: { main : view , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "users_edit" , path: `${mount}/:id/edit`, components: { main : edit , navi : navigation ,sub : sub } } as RouteConfig,
]