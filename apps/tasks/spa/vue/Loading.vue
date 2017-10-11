<template>
<div class="loading" v-if="loading">
   <div v-for="block in blocks" class="block" :class="block.class"></div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'

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
  name : "Loading",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState([
      'loading'
    ])
  },
})  

export default class Loading extends Vue {
    blockNum = 5;
    blocks = [];
    entry = () => {
      let e = (resolve,reject) => {
        let l = this.blockNum;
        let blocks = this.blocks;
        for(let i = 0 ; i <= l ;i++){
          blocks.push({class:""});
        }
        resolve(true);
      }
      return new Promise(e);
    }
    animate = () => {
      let l = this.blockNum;
      let blocks = this.blocks;
      let i = 0;
      let loading = () => {
        blocks[i].class = (blocks[i].class === "pop") ? "" : "pop";
        i++;
        if(i === l){
          i = 0;
        }
        setTimeout(loading, 160);
      } 
      loading();
    }
    mounted(){
      this.entry().then(r => this.animate());
    }
}
</script>

<style lang="stylus">

</style>