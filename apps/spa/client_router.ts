import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
import tasks from './tasks/spa_router';
export function createRouter(){
    return new Router({
        mode: 'history',
        routes: [
            ...tasks,
        ]
    })
}