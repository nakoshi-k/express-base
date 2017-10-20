<template>
<div class="sub" :class="size">
    <router-link to="/foo">Go to Foo</router-link>
</div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
  name: 'sub',
  props: {
  }
})


export default class sub extends Vue {
    isActive = true;

    size = {
      "column" : true,
      "column-25" : true,
    }

}

</script>