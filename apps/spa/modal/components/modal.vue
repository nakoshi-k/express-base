<template>
<div id="modal-container" class="modal-container" v-if="show" @click.self="close()">
  <div class="modal">
    <modal-destroy></modal-destroy>
    <modal-login></modal-login>
    <span @click="close()" class="close typcn typcn-delete large" :class="{disabled : isDisable }"></span>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState , mapMutations} from 'vuex'
import destroy from './inner/destroy.vue'
import login_modal from './inner/login_modal.vue'

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
  name : "modal",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState( 'modal' , {
        'show' : ({show}) => show,
        '_close' : ({close}) => close
      }
    )
  },
  methods : {
    ...mapMutations( "modal" , ["closeModal"])
  },
components : {
    "modal-destroy" : destroy,
    "modal-login" : login_modal 
  }

})

export default class modal extends Vue {
  show:boolean
  _close:boolean
  closeModal:() => {}
  
  close(){
    if(this._close){
      this.closeModal()
    }
  }

  get isDisable(){
    return !this.close
  }

}
</script>
