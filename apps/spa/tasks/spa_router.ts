import Router, { RouteConfig } from 'vue-router'
import navigation from '../navigation/components/navigation.vue'
import sub from "./components/sub.vue"
import idx from './components/idx.vue'
import add from './components/add.vue'
import view from './components/view.vue'
import edit from'./components/edit.vue'
const mount = "/tasks"

export default [
    { name : "tasks_page" ,path: `${mount}/page/:page*`, components: { main : idx , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_index" ,path: `${mount}/page/1` , alias : `${mount}/` } as RouteConfig,
    { name : "tasks_add" , path: `${mount}/add`, components: { main : add  , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_view" , path: `${mount}/:id`, components: { main : view , navi : navigation ,sub : sub } } as RouteConfig,
    { name : "tasks_edit" , path: `${mount}/:id/edit`, components: { main : edit , navi : navigation ,sub : sub } } as RouteConfig,
]