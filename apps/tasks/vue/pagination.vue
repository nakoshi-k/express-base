<template>
    <div v-html="page()"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {pagination_helper} from "../../../base/sideless/pagination_helper";
@Component({
  name: 'pagination',
  props: {
    pagination: {}
  }
})
export default class pagintaion extends Vue {
    p = new pagination_helper();
    pagination:any;
    mounted(){
        this.load();
        
    }
    load(){
       //p.render({});
    }
    page(){
      if(!this.pagination.currentPage){
        return "";
      }
      return this.p.render(this.pagination,{"path" : "/tasks/"});
    }

}
</script>