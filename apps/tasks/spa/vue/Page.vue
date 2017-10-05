<template>
<div class="resource column column-75">
<h2>Page</h2>
<div v-for="task in tasks">
<h3><router-link :to="view(task.id)">{{ task.title }}</router-link></h3>
<router-link :to="edit(task.id)" class="button small">edit</router-link>
</div>
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

  edit(id){
    return `/tasks/${id}/edit`;
  }

  get tasks (){
    return this.$store.state.tasks;
  }   


}
</script>
