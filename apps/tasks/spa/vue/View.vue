<template>
<div class="resource column column-75">
  <h2>View</h2>
  <h3>Id</h3>
  <div>{{task.id}}</div>
  <h3>Title</h3>
  <div>{{task.title}}</div>
  <h3>Priod</h3>
  <div>{{task.priod}}</div>
  <h3>Created</h3>
  <div>{{task.created_at}}</div>
  <h3>Updated</h3>
  <div>{{task.updated_at}}</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters} from 'vuex'
import * as flatpickr from "flatpickr";
import * as confirmDatePlugin from "../../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js";

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
  name : "Add",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class Add extends Vue {
    
  get task(){
    return this.$store.state.task;
  }
  
  asyncData ({ store, route }) {
    return store.dispatch('fetchEntity' ,route);
  }

  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      });
    }
  }
}
</script>
