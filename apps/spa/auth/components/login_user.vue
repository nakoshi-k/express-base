<template>
<div>
  <div class="login-user">
    ログインユーザー
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'
import loading from './loading'

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
    "app-loading" : loading,
  },
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ])
  },
})

export default class login_user extends Vue {

}
</script>
