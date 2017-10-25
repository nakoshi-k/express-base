<template>
<div class="margin">
  <div class="login-user row">
    <div class="column column-25">avatar</div>
    <div class="column column-75 text-sm">
      <div class="text-md">{{user.name}}</div>
      <div>Last login : 最終ログイン</div>
      <div>Mail : {{user.mail}}</div>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions} from 'vuex'

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
    ...mapState("auth" , {
        user : ({user}) =>  user,
        auth_status : ({auth_status}) =>  auth_status,
    }),
    ...mapGetters([
      'domain' , 'token'
    ]),
  },
  methods : {
    ...mapActions( "auth" , 
      ["fetchAuthUser"]
    ),
  }
})

export default class login_user extends Vue {
  user:{id:string,name:string,mail:string}
  auth_status:boolean;
  fetchAuthUser:() => void;   

  mounted(){
    if(!this.auth_status){
      this.fetchAuthUser()
    }
  }

}
</script>
