import Vue from 'vue'
import app from './vue/app.vue'
import router from './router'

const createApp = () => {
  return new Vue({
    render: h => h(app)
  })
}
export let apps = createApp;
