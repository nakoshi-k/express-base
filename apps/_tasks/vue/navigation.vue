<template>
<div :class="size">
  <h4>Menu</h4>
  <ul>
    <li><router-link to="/tasks">index</router-link></li>
    <li><router-link to="/tasks/add">add</router-link></li>
  </ul>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({
  name: 'navigation',
  props: {
    csrf: String
  }
})


export default class main extends Vue {
    isActive = true;

    size = {
      "column" : true,
      "column-25" : true,
    }

}

</script>
