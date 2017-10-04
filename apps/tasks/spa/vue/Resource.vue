<template>
<div class="resource">
  <div v-for="task in tasks">
    <router-link :to="view(task.id)">{{ task.title }}</router-link>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Resource'
})

export default class Resource extends Vue {
  
  view(id){
    return `/tasks/${id}`;
  }

  mounted(){
    this.$store.dispatch("page");
  }
  
  get tasks (){
    return this.$store.state.tasks;
  }   


}
</script>
