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
  name : "orver_lay",
  components : {
    "app-loading" : () => import("./loading"),
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

export default class over_lay extends Vue {

}
</script>
