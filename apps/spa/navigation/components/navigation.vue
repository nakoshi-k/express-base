<template>
<div>
    <nav class="navigation column">
        <div class="container">
            <div class="row row-md-reverse">
              <div class="hidden-md column text-right">
                <ul class="navigation-list navigation-list-reverse">
                  <li class="show-lg show-xl show-md"><h1><router-link to="/tasks">Apprication</router-link></h1></li>
                  <li v-if="!auth_status" class="show-lg show-xl show-md"><a  @click="m_login()" title="login"> <span class="typcn typcn-key"></span> Login</a></li>
                  <li v-if="auth_status" class="show-lg show-xl show-md"><a @click="h_logout()" title="logout" ><span class="typcn typcn-export"></span> Logout</a></li>
                </ul>
              </div>
              <div class="column">
                <ul class="navigation-list">
                    <li><a href="#" class="offset-toggle" :class="{active : show}" @click="toggle" title="open offset menu"><span class="typcn typcn-th-menu"></span></a></li>
                    <li><router-link to="/tasks" title="Home">Home </router-link></li>
                    <li><router-link to="/tasks" title="Tasks">Tasks</router-link></li>
                    <li><router-link to="/users" title="Users">Users</router-link></li>
                    <li v-if="!auth_status" class="show-sm"><a @click="m_login()" title="login"><span class="typcn typcn-key"></span> Login</a></li>
                    <li v-if="auth_status" class="show-sm"><a @click="h_logout()" title="logout"><span class="typcn typcn-export"></span> Logout</a></li>
                </ul>
              </div>
            </div>
        </div>
        <app-indicater></app-indicater>
    </nav>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapMutations,mapActions} from 'vuex'
import indicater from '../../loading/components/indicator'

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
  name : "navi",
  components : {
    "app-indicater" : () => import ("../../loading/components/indicator"),
  },
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("offset" , {
      show : ({show}) => show
    }),
    ...mapState("auth" , {
      auth_user : ({user}) => user,
      auth_status :({auth_status}) => auth_status
    })
  },
  methods : {
    ...mapMutations( "offset" , 
      ["toggleOffset"]
    ),
    ...mapActions("auth" , [
      "logout"
    ]),
    ...mapMutations( "modal" , ["setModal","toggleModal" , "openModal"] ),
  }
})

export default class navi extends Vue {
  show:boolean;
  logout : () => void;
  asyncData ({ store, route }) {
    return store.dispatch('auth/fetchAuthUser')
  }
  toggleOffset:() => {}

  toggle(){
    this.toggleOffset();
  }
  openModal:() => void
  setModal:(modalOptions : any) => void
  m_login(){
    this.setModal({"template" : "login_modal"})
    this.openModal()
  }  
  
  h_logout(){
    this.logout();
    return false;
  }

}
</script>