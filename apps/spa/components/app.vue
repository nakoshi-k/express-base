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
  <app-overlay></app-overlay>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import over_lay from './over_lay.vue';
import modal from './modal'

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
  name: 'app',
  components:{
    "app-overlay":over_lay,
    "app-modal":modal
  }
})
export default class app extends Vue {

}
</script>
