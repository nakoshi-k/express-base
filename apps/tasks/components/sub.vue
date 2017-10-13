<template>
<div class="column column-25">
    <ul>
        <li><router-link :to="mount">Index</router-link></li>
        <li><router-link :to="`${mount}/add`">Add</router-link></li>
    </ul>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapState} from "vuex";

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
  }),
}
})
export default class sub extends Vue {
  mount:string;


}
</script>
