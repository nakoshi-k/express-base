import Vue, { ComponentOptions } from 'vue';
import app from './vue/app.vue';
import router from './router';

//Vue.config.productionTip = false

new Vue({
  el: '#application',
  template: '<App/>',
  components: { app }
}as ComponentOptions<Vue>)
