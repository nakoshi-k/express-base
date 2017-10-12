<template>
<div id="modal-container" v-if="modal.show" @click.self="close()">
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
import Destroy from './modal/Destroy'

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
  name : "Modal",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState([
      'modal'
    ])
  },
  methods : {
    ...mapMutations(["closeModal"])
  },
  components : {
    "modal-destroy" : Destroy
  }

})

export default class Modal extends Vue {
  modal:{close:boolean};
  closeModal:() => {};
  close(){
    if(this.modal.close){
      this.closeModal()
    }
  }
  get isDisable(){
    return !this.modal.close;
  }

}
</script>
