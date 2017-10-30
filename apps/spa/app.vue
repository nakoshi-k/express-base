<template>
<div id="application">
  <router-view name="navi"></router-view>
  <div class="wrap container">
    <div class="row row-center">
      <router-view name="single"></router-view>
    </div>
    <div class="row row-md-reverse">
      <div class="column column-lg-75 column-md-65"><router-view name="main"></router-view></div>
      <div class="column column-lg-25 column-md-35"><router-view name="sub"></router-view></div>
    </div>
  </div>
  <app-offset></app-offset>

  <app-modal></app-modal>
  <app-overlay></app-overlay>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import over_lay from './loading/components/over_lay.vue';
import modal from './modal/components/modal.vue'
import offset from './offset/components/offset.vue'
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
    "app-overlay": () => import ( "./loading/components/over_lay.vue" ),
    "app-modal": () => import("./modal/components/modal.vue"),
    "app-offset": () => import("./offset/components/offset.vue")
  }
})

export default class app extends Vue {

}
</script>
