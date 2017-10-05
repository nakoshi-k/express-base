import {createApp} from './app';
let domain = {
    host:"",
    entities:"tasks",
    entity : "task",
    request : {}
}
const {app, router,store} = createApp(domain);

app.$mount("#application");