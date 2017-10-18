<template>
<div>
    <nav class="navigation column">
        <div class="container">
            <div class="row row-md-reverse">
              <div class="column text-right">
                <h1 class="hidden-md"><router-link to="/tasks">Apprication</router-link></h1>
              </div>
              <div class="column">
                <ul class="navigation-list">
                    <li><a href="#" class="offset-toggle" :class="{active : show}" @click="toggle" title="open offset menu"><span class="typcn typcn-th-menu"></span></a></li>
                    <li><a href="/tasks/aaa" title="Home">Home </a></li>
                    <li><a href="/tasks/aaa" title="Tasks">Tasks </a></li>
                    <li><a href="/tasks/aaa" title="Tasks">Users </a></li>
                    <li><a href="/tasks/aaa" title="Tasks">Products </a></li>
                </ul>
              </div>
            </div>
        </div>
        <app-indicater></app-indicater>
    </nav>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapMutations} from 'vuex'
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
    ]),
    ...mapState("offset" , {
      show : ({show}) => show
    })
  },
  methods : {
    ...mapMutations( "offset" , 
      ["toggleOffset"]
    ),
  }
})

export default class navi extends Vue {
  show:boolean;

  toggleOffset:() => {}
  toggle(){
    this.toggleOffset();
  }
}
</script>