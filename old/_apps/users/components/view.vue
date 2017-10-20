<template>
<div v-if="entity.id" class="view"> 
  <h2>View</h2>
  <h3>Id</h3>
  <div>{{entity.id}}</div>
  <h3>Name</h3>
  <div>{{entity.name}}</div>
  <h3>Mail</h3>
  <div>{{entity.mail}}</div>
  <h3>Group</h3>
  <div>{{entity.group_id}}</div>
  <h3>New password</h3>
  <div>{{entity.new_password}}</div>
  <h3>Confirm password</h3>
  <div>{{entity.confirm_password}}</div>
  <h3>Created at</h3>
  <div>{{entity.created_at}}</div>
  <h3>Updated at</h3>
  <div>{{entity.updated_at}}</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'

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
  name : "view",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("users" , {
      entity : ({entity}) =>  entity
    }),

  },
})

export default class view extends Vue {

  
  asyncData ({ store, route }) {
    return store.dispatch('users/fetchEntity' ,route)
  }


}
</script>
