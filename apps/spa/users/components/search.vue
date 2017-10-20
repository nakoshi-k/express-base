<template>
    <div class="search">
      <form :action="action" method="get" v-on:submit.prevent="search()">
        <fieldset>
        <label for="id">Id</label>
        <input type="text" name="id" v-model="frm.id" placeholder="id">
        <label for="name">Name</label>
        <input type="text" name="name" v-model="frm.name" placeholder="name">
        <label for="mail">Mail</label>
        <input type="email" name="mail" v-model="frm.mail" placeholder="mail">
        <label for="group_id">Group</label>
        <input type="text" name="group_id" v-model="frm.group_id" placeholder="group_id">
        <label for="access_token">Access token</label>
        <input type="text" name="access_token" v-model="frm.access_token" placeholder="access_token">
        <label for="refresh_token">Refresh token</label>
        <input type="text" name="refresh_token" v-model="frm.refresh_token" placeholder="refresh_token">
        <label for="new_password">New password</label>
        <input type="password" name="new_password" v-model="frm.new_password" placeholder="new_password">
        <label for="confirm_password">Confirm password</label>
        <input type="password" name="confirm_password" v-model="frm.confirm_password" placeholder="confirm_password">
        <label for="created_at">Created at</label>
        <input class="calendar" type="datetime-local" name="created_at" v-model="frm.created_at" placeholder="created_at">
        <label for="updated_at">Updated at</label>
        <input class="calendar" type="datetime-local" name="updated_at" v-model="frm.updated_at" placeholder="updated_at">
        </fieldset>
        <div class="text-right">
          <button type="button" class="button small warning" @click="reset()"><span class="typcn typcn-minus"></span> clear</button>
          <button type="submit" class="button small "><span class="typcn typcn-zoom"></span> search</button>
        </div>
      </form>
    </div>
</div>
</template>
<script lang="ts">
  import Vue from 'vue'
import Component from 'vue-class-component'
import {mapState} from "vuex"
import * as flatpickr from "flatpickr"
import * as confirmDatePlugin from "../../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js"
import {build_query} from "../../../../base/sideless/build_query"
let bq = new build_query()
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
  ...mapState( 'users' , {
    mount : ({mount}) => mount 
  }),
}
})
export default class search extends Vue {
  mount:string
  
  frm = {
        "id" : "",
        "name" : "",
        "mail" : "",
        "group_id" : "",
        "access_token" : "",
        "refresh_token" : "",
        "new_password" : "",
        "confirm_password" : "",
        "created_at" : "",
        "updated_at" : "",
  }

  search(){
    let q = bq.http(this.frm)
    this.$router.push(`${this.mount}?${q}`)
  }
  reset(){
    let frm = this.frm;
    for(let key in frm){
      frm[key] = null
    }
  }
  get action(){
    return this.mount
  }
  
  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      })
    }
  }

}
</script>
