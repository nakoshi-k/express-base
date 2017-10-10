<template>
<div class="resource column column-75">
  <h2>Edit</h2>
  <form :action="action" method="post">
    <input type="hidden" name="id" :value="task.id"  @change="updateEntity">
    <input type="hidden" name="_csrf" :value="token">
    <input type="hidden" name="_method" value="put">
    <div class="form-item">
      <label for="title">title</label>
      <input type="text" name="title" :value="task.title" placeholder="title" @change="updateEntity">
    </div>
    <div class="form-item">
      <label for="priod">priod</label>
      <input type="text" name="priod" class="calendar" :value="task.priod" placeholder="priod" @change="updateEntity">
    </div>
    <button type="submit">submit</button>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'
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
    ]),
    ...mapState({
      task: state => state["task"]
    }),
  },

})

export default class Edit extends Vue {
  task:{id:string};
  domain:string;
  asyncData ({ store, route }) {
    return store.dispatch('fetchEntity' ,route);
  }

  beforeEnter(to, from, next){
    next(vm => {
      this.$store.commit("loading");
    })
  }
  beforeRouteUpdate(to, from, next){
      this.$store.commit("endLoading");
  }
  
  get action(){
    return `/${this.domain}/${this.task.id}`
  }

  updateEntity = (e) => {
    let kv = {}
    kv["key"] = e.target.name;
    kv["value"] = e.target.value;
    this.$store.commit('updateEntity', kv );
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
