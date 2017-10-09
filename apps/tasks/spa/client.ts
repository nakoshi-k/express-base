import {createApp} from './app';

let domain = {
    host:"",
    entities:"tasks",
    entity : "task",
    server : { request : {} },
}
const {app, router,store} = createApp(domain);

if (window["__INITIAL_STATE__"]) {
    store.replaceState(window["__INITIAL_STATE__"])
}
app.$mount("#application");