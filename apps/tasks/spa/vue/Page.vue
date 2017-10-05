<template>
<div class="resource">
<div v-for="task in tasks">{{ task.title }}</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

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

@Component({})

export default class Page extends Vue {

  asyncData ({ store, route }) {
    return store.dispatch('fetchEntities');
  }

  view(id){
    return `/tasks/${id}`;
  }

  
  get tasks (){
    return this.$store.state.tasks;
  }   


}
</script>
