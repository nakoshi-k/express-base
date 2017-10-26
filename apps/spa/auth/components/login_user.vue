<template>
<div v-if="auth_status" class="margin">
  <div class="login-user row padding">
    <div class="column column-25">avatar</div>
    <div class="column column-75 text-sm">
      <div class="text-md">{{user.name}}</div>
      <div>Mail : {{user.mail}}</div>
      <div>Last login : {{user.last_login}}</div>
      <div v-if="auth_status"><a @click="logout()" title="logout"><span class="typcn typcn-export"></span> Logout</a></div>
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
      ["fetchAuthUser","logout"]
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
