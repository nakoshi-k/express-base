<template>
<div class="add" :class="size">
  
  <form action="./" method="post">
    <input type="hidden" name="_csrf" :value="token()" placeholder="title">
    <div class="form-item">
      <label for="title">title</label>
      <input type="text" name="title" v-model="entity.title" placeholder="title">
    </div>
    <div class="form-item">
      <label for="priod">priod</label>
      <input type="text" name="priod" class="calendar" v-model="entity.priod" placeholder="priod">
    </div>
    <button type="submit" >submit</button>
  </form>

</div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component';
import * as flatpickr from "flatpickr";

@Component({
  name: 'add',
  props: {
  }
})

export default class add extends Vue {
    isActive = true;
    size = {
      "column" : true,
      "column-75" : true,
    }
    entity = {
      title : "",
      priod : ""
    }
    token(){
      let body = document.getElementsByTagName("body")[0];
      let csrfToken = body.attributes["data-csrf-token"].value;
      return csrfToken;
    }
    mounted(){
      flatpickr(".calendar");
    }
}

</script>