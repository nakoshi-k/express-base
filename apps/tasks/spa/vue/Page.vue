<template>
<div class="resource column column-75">
  <h2>Index</h2>
  <div>
    <div v-for="task in tasks">
    <h3><router-link :to="view(task.id)">{{ task.title }}</router-link></h3>
    <router-link :to="edit(task.id)" class="button small">edit</router-link>
    <button @click="destroy(task.id)" class="button small">delete</button>
    </div>
  </div>
  <pagination :pagination="pagination"></pagination>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Pagination from './Pagination.vue';

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
  name : "Page",
  components:{Pagination}
})

export default class Page extends Vue {
  
  asyncData ({ store, route }) {
    return store.dispatch('fetchEntities' ,route);
  }



  get pagination (){
    return this.$store.state.page;
  }
  
  get tasks(){
    return this.$store.state.tasks;
  }
 
  view(id){
    return `/tasks/${id}`;
  }

  edit(id){
    return `/tasks/${id}/edit`;
  }

  destroy(id){
    return `/tasks/${id}/delete`;
  }

  
}
</script>
