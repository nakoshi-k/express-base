<template>
<div id="modal-container" v-if="show" @click.self="close()">
  <div class="modal">
    <span @click="close()" class="close typcn typcn-delete large" :class="{disabled : isDisable }"></span>
    <div class="content">
      <modal-destroy></modal-destroy>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState , mapMutations} from 'vuex'
import destroy from './modal/destroy'

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
    "modal-destroy" : destroy
  }

})

export default class modal extends Vue {
  show:boolean;
  _close:boolean;
  closeModal:() => {};
  
  close(){
    if(this._close){
      this.closeModal()
    }
  }

  get isDisable(){
    return !this.close;
  }

}
</script>
