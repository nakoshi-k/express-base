<template>
<div class="add" :class="size">
    <form :action="put(entity.id)" method="post">
    <input type="hidden" name="_method" value="put">
    <input type="hidden" name="_csrf" :value="token()">
    <input type="hidden" name="id" v-model="entity.id">
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
    
    put(id){
        return "/tasks/" + id;
    }

    entity = {
      title : ""
    }

    token(){
      /*
      let body = document.getElementsByTagName("body")[0];
      let csrfToken = body.attributes["data-csrf-token"].value;
      return csrfToken;
      */
    }

    mounted(){
      flatpickr(".calendar");
      this.isActive = false;
      this.load();
    }

    load(){
        fetch( `/tasks/${this.$route.params.id}` , {
            credentials: 'same-origin' ,
            method: "get",
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(response.status === 201){ 
                return response.json();
            };
            return response.json();
        }).then((json) => {
            this.entity = json;
            this.isActive = true;
        }).catch((err) => {

        });
    }


}

</script>