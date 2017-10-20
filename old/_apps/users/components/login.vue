<template>
  <div class="login column column-md-50 column-md-offset-25">
  <div class="panel">
  <h1 class="text-center">Application</h1>
  <h2>Login</h2>
  <form action="" method="post">
    <fieldset>
      <input type="hidden" name="_csrf" :value="token">
      <div class="form-item">
        <label for="name">User Name</label>
        <input type="text" name="account"  :value="entity.account" placeholder="name">
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" name="password":value="entity.password" placeholder="password">
      </div>
    </fieldset>
    <button type="submit">Login</button>
  </form>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import form_validation from "../../spa/utility/validation"

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
  name : "login",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),

  },
  methods : {
   
  }
})

export default class login extends Vue {
  entity = {
    account : "",
    password : ""
  }
  
  action(){
    return "";
  }

  login(){

  }
}
</script>
