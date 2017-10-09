<template>
<div class="modal">
 
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters} from 'vuex'

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
  name : "Modal",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class Modal extends Vue {

}
</script>
