<template>
  <div v-if="indicator.show" class="indicator" :class="css" :style="{width:width + '%' }"> </div>
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
  name : "Indicator",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState( "loading" ,{
        indicator : (state:any) => state.indicator
      } 
    )
  },
})  

export default class Indicator extends Vue {
  indicator:any;

  public light = true;
  private _beat;

  get width(){
    return this.indicator.complate;
  }

  private beat = (self) => {
      let i = 0;
      self._beat = () => {
        let prosess = self.indicator.prosess;
        if(prosess === true){
          self.light = (self.light) ? false : true;
          setTimeout(self._beat, 2000);
          return;
        }
        if(prosess === false && self.light === false ){
          self.light = true;
        }
        setTimeout(self._beat, 2000);
      } 
      self._beat();
  }

  public get css (){
    let css = { light : false };
    css[ this.indicator.status ] = true;
    css.light = this.light;
    return css;
  }

  mounted(){
    let self = this;
    this.beat(self);
  }


}

</script>

<style lang="stylus">

</style>