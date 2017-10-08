<template>
<nav class="pagination">
  <ul class="pagination-list">
    <li v-if="show.first" @click="move"><router-link :to="first">first</router-link></li>
    <li v-if="show.prev" @click="move"><router-link :to="prev">prev</router-link></li>
    <li v-for="list in numbers" @click="move" >
       <router-link :to="list.url">{{list.num}}</router-link>
    </li>
    <li v-if="show.next" @click="move"><router-link :to="next">next</router-link></li>
    <li v-if="show.last" @click="move"><router-link :to="last">last</router-link></li>
  </ul>

</nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Component from 'vue-class-component';
import {build_query} from "../../../../base/sideless/build_query";
let bq = new build_query();

@Component({
  name: 'Pagination',
  computed : {
    ...mapGetters([
      'domain'
    ])
  },
  props: {
    modelName:String,
    pagination: {},
    load:{}
  }
})

export default class Pagintaion extends Vue {
    pagination;
    domain:String;
    numbers = [];
    
    show = {
      first : true,
      last : true,
      next : true,
      prev : true
    }
    
    get prev(){
      return ""
    }
    
    get next(){
      return ""; 
    }

    get first() {
      return this.format(1);
    }

    get last(){
      let last = this.pagination.totalPage;
      return this.format(last);
    }

    format( number : number ) {
      let query = this.pagination.queryPrams;
      let httpQuery = bq.http(query)
      return `/${this.domain}/page/` + number + "/" + httpQuery 
    }


    mounted(){
        this.page();
    }

    number(numbers){
      let total = this.pagination.totalPage;
      for(let i = 1;i <= total ;i++){
        numbers.push({ url : this.format(i)  , num : i });
      }
    }   

    page(){
      if(!this.pagination.currentPage){
        return "";
      }
      this.number(this.numbers);
    }

    move() {
      this.$emit('movepage');
    }
}
</script>