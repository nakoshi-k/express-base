<template>
<div class="resource column column-75">
  <h2>Edit</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <input type="hidden" name="id" :value="entity.id"  @change="change">
    <input type="hidden" name="_csrf" :value="token">
    <input type="hidden" name="_method" value="put">
    <div class="form-item">
      <label for="title">title</label>
      <input type="text" name="title" :value="entity.title" :class="validationClass('title')" placeholder="title" @change="change">
      <div class="errors" v-for="e in errors.title"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
    </div>
    <div class="form-item">
      <label for="priod">priod</label>
      <input type="text" name="priod" class="calendar" :class="validationClass('priod')" :value="entity.priod" placeholder="priod" @change="change">
      <div class="errors" v-for="e in errors.priod"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
    </div>
    <button type="submit">submit</button>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import * as flatpickr from "flatpickr";
import * as confirmDatePlugin from "../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js";

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
  name : "edit",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("tasks" , {
        entity : ({entity}) =>  entity,
        mount : ({mount}) => mount 
    }),
  },
  methods : {
    ...mapActions( "tasks" , 
      ["fetchEntity" , "saveEntity"]
    ),
    ...mapMutations( "tasks" , 
      ["updateEntity"]
    ),
    ...mapMutations( "loading" , 
      ["loading","endLoading"]
    )
  }

})

export default class edit extends Vue {
  mount:string;
  entity:{
    id : string,
    title : string,
    priod : string,
  }
  asyncData ({ store, route }) {
    return store.dispatch('tasks/fetchEntity' , route );
  }
 
  get action(){
    return `${this.mount}/${this.entity.id}`

  }
  updateEntity:(kv) => {};
  change = (e) => {
    let kv = {}
    kv["key"] = e.target.name;
    kv["value"] = e.target.value;
    this.updateEntity(kv);
  }

  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      });
    }
  }
  token : string;
  saveEntity:(token : string) => Promise<string>;
  loading : () => {};
  endLoading: (status) => {};
  errors = {};
  save(){
    this.loading();
    this.saveEntity(this.token).then(r => {
      this.errors = {};
      this.endLoading("success");
    }).catch(e => {
      this.errors = e;
      this.endLoading("warning");
    });
  }
  
  validationClass(name){
    if(this.errors[name]){
      return "warning"
    }
  }

}
</script>
