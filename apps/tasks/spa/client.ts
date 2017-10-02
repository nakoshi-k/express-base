import Vue, { ComponentOptions } from 'vue'
import app from './vue/app.vue'
import router from './router'

//Vue.config.productionTip = false

new Vue({
  el: '#application',
  router,
  template: '<App/>',
  components: { app }
}as ComponentOptions<Vue>)
