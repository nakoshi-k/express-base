<template>
<div>
  <transition name="orverlay">
  <div v-if="overLay" id="over-lay" class="over-lay">
    <app-loading>ローディング</app-loading>
  </div>
  </transition>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'
import Loading from './Loading'

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
  components : {
    "app-loading" : Loading,
  },
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("loading" , {
      overLay: ({overLay}) => overLay,
    }) 
  },
})

export default class OverLay extends Vue {

}
</script>
