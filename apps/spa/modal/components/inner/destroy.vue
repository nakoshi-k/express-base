<template>
<div v-if="show" class="content">
  <h3>Delete #{{data.id}}</h3>
  "{{data.name}}" を削除します。一度削除されたデータは元に戻す事ができません。
  <div class="margin text-right">
    <button :disabled="!button.cancel" @click="closeModal()" class="button warning">Cancel</button>
    <button :disabled="!button.done" @click="destroy()" class="button primary">Apply</button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState,mapMutations,mapActions} from 'vuex'

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
    ...mapMutations('modal' , [ "setModal" , "toggleModal", "closeModal","deleteEntity"]),
    ...mapMutations( "loading" , 
      ["loading","endLoading"]
    )
  }
})

export default class Destroy extends Vue {
    
    closeModal:() => {};
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
    token :string;
    deleteEntity: (data) => Promise<string>;

    loading:() => {};
    endLoading:(status) => {};

    destroy(){
      let data = this.data
      data["token"] = this.token
      this.loading();
      let names = data.mount.replace("/","");
      this.$store.dispatch( `${names}/deleteEntity` , data).then(r => {
        this.closeModal();
        this.$store.dispatch(`${names}/fetchEntities`,this.$store.state.route );
        this.endLoading("success");
      }).catch(e => {
        this.endLoading("warning");
      })
    } 

    cancel(){
      let plot  = this.disable();
      plot.then(res => {
        this.closeModal();
      })
    }       
}
</script>
