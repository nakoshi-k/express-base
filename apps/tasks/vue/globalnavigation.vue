<template>
  <nav class="navigation column">
      <div class="container">
          <div class="row">
              <ul class="navigation-list">
                  <li><a href="/tasks/aaa">menu 1</a></li>
                  <li><a href="/tasks/aaa">menu 2</a></li>
                  <li><a href="/tasks/aaa">menu 3</a></li>
                  <li><a href="/tasks/aaa">menu 4</a></li>
                  <li><a href="/tasks/aaa">menu 5</a></li>
                  <li><a href="/tasks/aaa">menu 6</a></li>
              </ul>
          </div>
      </div>
  </nav>
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
