<template>
<div v-if="show">
  <div>Destroy</div>
  削除するかい？
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters , mapState} from 'vuex'

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
})

export default class Destroy extends Vue {
    modal:{
      template:string,
      data : {
        id : string,
        name : string
      }
      };
    name = "Destroy"
    get show(){
        return this.modal.template === this.name
    }
}
</script>
