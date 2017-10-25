<template>
  <div v-if="show">
  <h2>Login</h2>
  <form :action="action" method="post" v-on:submit.prevent="login">
    <fieldset>
      <input type="hidden" name="_csrf" :value="token" >
      <div class="form-item">
        <label for="name">user name or e-mail </label>
        <input type="text" name="account"  v-model="user.account" :class="validationClass( errors , 'account')"  placeholder="user name or e-mail">
        <div class="errors" v-for="e in errors.account"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="user.password" :class="validationClass( errors , 'password')" placeholder="password">
        <div class="errors" v-for="e in errors.password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>
    </fieldset>
    <button type="submit" :class="validationClass(errors,'submit')">Login</button>
  </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import form_validation from "../../../../utilities/validation"
import {auth as auth_api} from "../../../../resources/auth"

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
  name : "login_modal",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState('modal' , { 
      'close' : ({close}) => close,
      'data' : ({data}) => data,
      'template' : ({template}) => template,
    })
  },
  methods : {
     ...mapMutations('modal' , [ "setModal" , "toggleModal", "closeModal"]),
     ...mapMutations('auth' , [ "setAuthUser"]),
     ...form_validation.map(["validationClass"])
  }
})

export default class login_modal extends Vue {
  name = "login_modal"
  setModal:(modal) => {};

  template:string
  close : boolean
  data : {
    id : string,
    name : string,
    mount : string
  };

  button = {
    done : true,
    cancel : true
  }
  
  get show(){
      return this.template === this.name
  }

  user = {
    account : "",
    password : ""
  }
  errors = {}

  get action(){
    return "/api/users/login";
  }
  
  token:string
  closeModal:() => void
  setAuthUser:(user) => void
  login(){
    let auth = new auth_api();
    auth.login( this.user , this.token ).then(r => {
      this.errors = {};
      this.setAuthUser(r)
      this.closeModal()
    }).catch(e => {
      this.errors = e;
    })
  } 
}
</script>
