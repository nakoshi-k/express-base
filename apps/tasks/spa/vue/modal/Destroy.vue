<template>
<div v-if="show">
  <h3>Delete #{{modal.data.id}}</h3>
  "{{modal.data.name}}" を削除します。一度削除されたデータは元に戻す事ができません。
  <div class="margin text-right">
    <button :disabled="!button.done" class="button primary">Done</button>
    <button @click="!button.cancel" class="button warning">Cancel</button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState,mapMutations} from 'vuex'

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
  name : "Destroy",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState([
      'modal'
    ])
  },
  methods : {
    ...mapMutations([ "setModal" , "toggleModal", "closeModal"])
  }
})

export default class Destroy extends Vue {
    
    closeModal:() => {};
    setModal:() => {};

    modal:{
      template:string,
      data : {
        id : string,
        name : string
      }
      }
    button = {
      done : true,
      cancel : true
    }
    name = "Destroy";
    
    get show(){
        return this.modal.template === this.name
    }

    disable(){
      let disable = (resolve,reject) => {
          this.modal.close = false;
          this.openModal();
      }
      return new Promise();
    }

    delete(){
      
    } 

    cancel(){
      this.closeModal();
    }       
}
</script>
