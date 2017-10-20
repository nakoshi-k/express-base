<template>
<div>
    <nav class="navigation column">
        <div class="container">
            <div class="row row-md-reverse">
              <div class="column text-right">
                <h1 class="hidden-md"><router-link to="/tasks">Apprication</router-link></h1>
                <router-link to="/users/login" title="Login">Login</router-link>
              </div>
              <div class="column">
                <ul class="navigation-list">
                    <li><a href="#" class="offset-toggle" :class="{active : show}" @click="toggle" title="open offset menu"><span class="typcn typcn-th-menu"></span></a></li>
                    <li><router-link to="/tasks" title="Home">Home </router-link></li>
                    <li><router-link to="/tasks" title="Tasks">Tasks</router-link></li>
                    <li><router-link to="/users" title="Users">Users</router-link></li>
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
import indicater from '../../loading/components/indicator'

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