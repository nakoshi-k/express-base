<template>
<nav class="pagination">
  <ul class="pagination-list">
    <li v-for="list in numbers" @click="move" >
          <router-link :to="list.url">{{list.num}}</router-link>
    </li>
  </ul>

</nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {build_query} from "../../../base/sideless/build_query";
let bq = new build_query();

@Component({
  name: '',
  props: {
    modelName:String,
    pagination: {},
    load:{}
  }
})

export default class pagintaion extends Vue {

    pagination;

    mounted(){
        this.page();
    }
    ...mapGetters([
      'domain',
    ])

    number(numbers,pagination){
      console.log(12);

      let httpQuery = bq.http(pagination.queryPrams);
      for(let i = 1;i <= pagination.totalPage ;i++){
        numbers.push({ url : "/tasks/page/" + i + "/" + httpQuery , num : i });
      }
    }   

    page(){
      if(!this.pagination.currentPage){
        return "";
      }
      this.number(this.numbers,this.pagination);
    }

    move() {
      this.$emit('movepage');
    }
}
</script>