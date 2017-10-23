<template>
<div class="margin">
  <div class="login-user row">
    <div class="column column-25">avatar</div>
    <div class="column column-75 text-sm">
      <div class="text-md">ユーザー名</div>
      <div>Last login : 最終ログイン</div>
      <div>Mail : example@example.com</div>
    </div>

  </div>
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
  name : "login_user",
  components : {
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
