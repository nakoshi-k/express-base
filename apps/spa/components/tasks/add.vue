<template>
<div class="resource column column-75">
  <h2>Add</h2>
  <form action="./" method="post">
    <input type="hidden" name="_csrf" :value="token">
    <div class="form-item">
      <label for="title">title</label>
      <input type="text" name="title" v-model="task.title" placeholder="title">
    </div>
    <div class="form-item">
      <label for="priod">priod</label>
      <input type="text" name="priod" class="calendar" v-model="task.priod" placeholder="priod">
    </div>
    <button type="submit" >submit</button>
  </form>
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
  name : "add",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class add extends Vue {
  task = {
    title : "",
    priod : ""
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
