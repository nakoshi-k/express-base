<template>
<div class="sub">
    <div class="panel">
      <h4>Search</h4>
      <app-search></app-search>
    </div>
    <div class="panel">
      <h4>Menu</h4>
      <nav class="navigation-stack">
        <ul class="navigation-list">
            <li><router-link :to="mount">Index</router-link></li>
            <li><router-link :to="`${mount}/add`">Add</router-link></li>
        </ul>
      </nav>
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapState} from "vuex"

import search from './search.vue'

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
  name: 'sub',
  computed : {
  ...mapState( 'tasks' , {
    mount : ({mount}) => mount 
  })
  },
  components:{"app-search" : search}
})
export default class sub extends Vue {
  mount:string

}
</script>
