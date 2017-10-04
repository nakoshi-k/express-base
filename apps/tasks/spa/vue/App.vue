<template>
<div id="application">
  <router-view name="navi"></router-view>
  <div class="wrap container">
    <div class="row">
      <router-view name="sub"></router-view>
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'app'
})
export default class App extends Vue {

}
</script>
