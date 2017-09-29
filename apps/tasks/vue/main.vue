<template>
<div class="wrap">
    <div class="remodal-bg"></div>
    <global-navigation></global-navigation>
    <div class="container">
        <div class="row">
        <tasks-navigation></tasks-navigation>
        <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import navigation from './navigation.vue';
import globalNavigation from './globalnavigation.vue';

@Component({
  name: 'index',
  props: {
    csrf: String
  },
  components:{
      "tasks-navigation" : navigation,
      "global-navigation" : globalNavigation
      }

})


export default class main extends Vue {
    isActive = true;

    size = {
      "column" : true,
      "column-25" : true,
    }

}

</script>
