<template>
<div>
    <nav class="navigation column">
        <div class="container">
            <div class="row">
                <ul class="navigation-list">
                    <li><a href="/tasks/aaa">menu 1</a></li>
                    <li><a href="/tasks/aaa">menu 2</a></li>
                    <li><a href="/tasks/aaa">menu 3</a></li>
                    <li><a href="/tasks/aaa">menu 4</a></li>
                </ul>
            </div>
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