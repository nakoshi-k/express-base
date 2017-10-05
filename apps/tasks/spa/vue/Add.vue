<template>
<div class="resource column column-75">

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

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

@Component({})

export default class Add extends Vue {
  get domain (){
    return this.$store.state.domain;
  }   

}
</script>
