<template>
<div v-if="show" id="offset-container" class="offset-container">
  <div class="offset">
    <span class="close typcn typcn-delete large"></span>
    <div class="content">
      <ul>
        <li><a href="#">aaa</a></li>
        <li><a href="#">aaa</a></li>
        <li><a href="#">aaa</a></li>
        <li><a href="#">aaa</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState , mapMutations} from 'vuex'

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

  },
  components : {

  }

})

export default class offset extends Vue {
  show:boolean
  _close:boolean;
  close(){
    
    if(this._close){
      
    }

  }



}
</script>
