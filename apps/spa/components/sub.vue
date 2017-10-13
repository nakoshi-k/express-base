<template>
<div class="column column-25">
    <ul>
        <li><router-link :to="`/tasks`">Index</router-link></li>
        <li><router-link :to="`/tasks/add`">Add</router-link></li>
    </ul>
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
  name: 'sub'
})
export default class sub extends Vue {



}
</script>
