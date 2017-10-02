<template>
<div class="view" :class="size">
    <div v-if="isActive">
    <h3>{{task.title}}</h3>
    <div>{{task.priod}}</div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
  name: 'view',
  props: {
  }
})
export default class view extends Vue {
    isActive = false;

    size = {
      "column" : true,
      "column-25" : true,
    }

    task = {
        "title" : "title",
        "priod" : "priod",

    };

    mounted(){
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
            this.task = json;
            this.isActive = true;
        }).catch((err) => {

        });
    }
}

</script>