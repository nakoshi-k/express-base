<template>
<div>
    <nav class="navigation column">
        <div class="container">
            
            <ul class="navigation-list">
                <li><a href="#" class="offset-toggle" title="open offset menu"><span class="typcn typcn-th-menu"></span></a></li>
                <li><a href="/tasks/aaa" title="Home">Home </a></li>
                <li><a href="/tasks/aaa" title="Tasks">Tasks </a></li>
                <li><a href="/tasks/aaa" title="Tasks">Users </a></li>
                <li><a href="/tasks/aaa" title="Tasks">Products </a></li>
            </ul>
        </div>
        <app-indicater></app-indicater>
    </nav>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'
import indicater from './indicator'

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
  name : "navi",
  components : {
    "app-indicater" : indicater,
  },
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class navi extends Vue {

}
</script>