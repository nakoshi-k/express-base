<template>
<div v-if="show">
  <h3>Delete #{{data.id}}</h3>
  "{{data.name}}" を削除します。一度削除されたデータは元に戻す事ができません。
  <div class="margin text-right">
    <button :disabled="!button.done" class="button primary">Apply</button>
    <button :disabled="!button.cancel" @click="closeModal()" class="button warning">Cancel</button>
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
  name : "destroy",
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
    ...mapMutations('modal' , [ "setModal" , "toggleModal", "closeModal"])
  }
})

export default class Destroy extends Vue {
    
    closeModal:() => {};
    setModal:(modal) => {};

    template:string;
    close : boolean;
    data : {
      id : string,
      name : string
    };
  
    button = {
      done : true,
      cancel : true
    }
    name = "Destroy";
    
    get show(){
        return this.template === this.name
    }

    disable(){
      let disable = (resolve,reject) => {
          resolve(true);
      }
      return new Promise(disable);
    }

    delete(){
      
    } 

    cancel(){
      let plot  = this.disable();
      plot.then(res => {
        this.closeModal();
      })
    }       
}
</script>
