<template>
<div id="modal-container" v-if="modal.show" @click.self="close">
  <div class="modal">
      <div class="text-right">
        <span @click="close" class="typcn typcn-delete large"></span>
      </div>
    <div class="content">
      <modal-destroy></modal-destroy>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState} from 'vuex'
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
  components : {
    "modal-destroy" : Destroy
  }
})

export default class Modal extends Vue {

  close(){
    this.$store.commit("closeModal");
  }


}
</script>
