import Router, { RouteConfig } from 'vue-router'
const navigation = () => import ('../navigation/components/navigation.vue')
const sub = () => import('./components/sub.vue')
const idx = () => import('./components/idx.vue')
const add = () => import('./components/add.vue')
const view = () => import('./components/view.vue')
const edit = () => import('./components/edit.vue')
const mount = "/tasks"
export default [
    { name : "tasks_page" ,path: `${mount}/page/:page*`, components: { main : idx , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_index" ,path: `${mount}/page/1` , alias : `${mount}/` } as RouteConfig,
    { name : "tasks_add" , path: `${mount}/add`, components: { main : add , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_view" , path: `${mount}/:id`, components: { main : view , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_edit" , path: `${mount}/:id/edit`, components: { main : edit , navi : navigation ,sub : sub } } as RouteConfig,
]