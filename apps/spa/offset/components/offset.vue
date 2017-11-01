<template>
<div v-if="show" id="offset-container" class="offset-container">
  <div class="offset">
    <span @click="closeOffset()" class="close typcn typcn-delete large"></span>
    <div class="content">
      <login-user></login-user>
      <ul>
        <li><router-link to="/tasks" title="Tasks">Tasks</router-link></li>
        <li><router-link to="/users" title="Users">Users</router-link></li>
        <li><router-link to="/groups" title="Groups">Groups</router-link></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState , mapMutations} from 'vuex'
import login_user from '../../auth/components/login_user'

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
  name : "offset",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState( 'offset' , {
        'show' : ({show}) => show,
        '_close' : ({close}) => close
      }
    )
  },
  methods : {
    ...mapMutations( "offset" , 
      ["closeOffset"]
    ),
  },
  components : {
      "login-user" : login_user
  }

})

export default class offset extends Vue {
  show:boolean

}
</script>
