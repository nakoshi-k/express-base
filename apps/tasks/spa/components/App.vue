<template>
<div id="application">
  <router-view name="navi"></router-view>
  <div class="wrap container">
    <div class="row">
      <router-view name="sub"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
  <app-modal></app-modal>
  <over-lay></over-lay>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import OverLay from './OverLay.vue';
import Modal from './Modal'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'asyncData',
  'fetch',
  'middleware',
  'layout',
  'transition',
  'scrollToTop'
])

@Component({
  name: 'App',
  components:{
    "over-lay":OverLay,
    "app-modal":Modal
  }
})
export default class App extends Vue {

}
</script>
