<template>
<div class="column column-25">
    <ul>
        <li><router-link :to="`/${domain}`">Index</router-link></li>
        <li><router-link :to="`/${domain}/add`">Add</router-link></li>
    </ul>
    <button type="button" @click="modal">modal</button>
    <button type="button" @click="indicater">indicater</button>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

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
  name: 'Sub'
})
export default class Sub extends Vue {
  get domain (){
    return this.$store.state.domain;
  }

  modal(){

    this.$store.commit( "openModal" , {template : "Destroy" , data : { id : 1} } );
  }

  indicater = () => {
    this.$store.commit("setIndicator" , { status : "success" , complate : 30 });
  }

}
</script>
