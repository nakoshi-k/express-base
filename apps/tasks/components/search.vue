<template>
    <div class="search">
      <form :action="action" method="get" v-on:submit.prevent="search()">
        <fieldset>
        <label for="id">id</label>
        <input type="text" name="id" v-model="frm.id" placeholder="id">
        <label for="title">title</label>
        <input type="text" name="title" v-model="frm.title" placeholder="title">
        <label for="priod">priod</label>
        <input class="calendar" type="date" name="priod" v-model="frm.priod" placeholder="priod">
        <label for="created_at">created_at</label>
        <input class="calendar" type="date" name="created_at" v-model="frm.created_at" placeholder="created_at">
        <label for="updated_at">updated_at</label>
        <input class="calendar" type="date" name="updated_at" v-model="frm.updated_at" placeholder="updated_at">
        </fieldset>
        <div class="text-right">
          <button type="submit" class="small button"><span class="typcn typcn-zoom"></span> search</button>
        </div>
      </form>
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapState} from "vuex";
import * as flatpickr from "flatpickr";
import * as confirmDatePlugin from "../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js";
import {build_query} from "../../../base/sideless/build_query";
let bq = new build_query();
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
  name: 'find',
  computed : {
  ...mapState( 'tasks' , {
    mount : ({mount}) => mount 
  }),
}
})
export default class search extends Vue {
  mount:string;
  
  frm = {
        "id" : "",
        "title" : "",
        "priod" : "",
        "created_at" : "",
        "updated_at" : "",
  }

  search(){
    let q = bq.http(this.frm);
    this.$router.push(`${this.mount}?${q}`);
  }

  get action(){
    return this.mount;
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
