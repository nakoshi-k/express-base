import Vue ,{ComponentOptions} from 'vue';
import App from './vue/App.vue';
import { createRouter } from './router';
const router = createRouter();
const app = new Vue({
    router,
    components : {App}
  }) 
app.$mount("#application");