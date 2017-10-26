import {createApp} from './application';

const {app, router,store} = createApp({});

if (window["__INITIAL_STATE__"]) {
    store.replaceState(window["__INITIAL_STATE__"])
}
app.$mount("#application");
