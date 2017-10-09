<template>
<div class="over-lay">
オーバーレイ
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
  name : "OrverLay",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class OverLay extends Vue {

}
</script>
