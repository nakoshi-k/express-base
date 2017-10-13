<template>
<div v-if="check">
  <nav class="pagination clearfix">
    <ul class="pagination-list">
      <li v-if="special.first">
        <router-link :to="first.link" :class="first.css">&laquo; First</router-link></li>
      <li v-if="special.prev">
        <router-link :to="prev.link" :class="prev.css">&lsaquo; Prev</router-link></li>
      <li v-for="list in numbers" :class="list.active">
        <router-link :to="list.link">{{list.num}}</router-link></li>
      <li v-if="special.prev">
        <router-link :to="next.link" :class="next.css">Next &rsaquo;</router-link></li>
      <li v-if="special.prev">
        <router-link :to="last.link" :class="last.css">Last &raquo;</router-link></li>
    </ul>

  </nav>
  <div class="text-right text-medium"> Page {{pagination.currentPage}} / {{pagination.totalPage}} </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Component from 'vue-class-component';
import {build_query} from "../../../base/sideless/build_query";
let bq = new build_query();

@Component({
  name: 'pagination',
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

export default class pagintaion extends Vue {
  
    pagination:{
      totalPage:number,
      currentPage:number,
      queryPrams:{string}
    };

    get check(){
      let pg = this.pagination
      if(pg.currentPage > pg.totalPage){
        return false
      }
      return true;
    } 

    domain:String;
    
    special = {
      first : true ,
      last : true,
      next : true,
      prev : true 
    }
    
    get prev(){
      let cr = this.pagination.currentPage;
      let link = ( cr > 1 ) ? this.format(cr -1 ) : this.format(1);
      let css = (cr === 1 ) ? "disable" : "";
      return {
        link : link,
        css : css 
      }
    }
    
    get next(){
      let cr = this.pagination.currentPage;
      let tr = this.pagination.totalPage;
      let link = ( tr <= cr ) ? this.format(tr) : this.format(cr+1);
      let css = ( tr <= cr ) ? "disable" : "";
      return {
        link : link,
        css : css 
      }
    }

    get first() {
      let cr = this.pagination.currentPage;
      let link = this.format(1);
      let css = (cr === 1 ) ? "disable" : "";
      return {
        link : link,
        css : css 
      }
    }

    get last(){
      let cr = this.pagination.currentPage;
      let tr = this.pagination.totalPage;
      let link = this.format(tr);
      let css = ( tr <= cr ) ? "disable" : "";
      return {
        link : link,
        css : css 
      }
    }

    format( number : number ) {
      let query = this.pagination.queryPrams;
      let httpQuery = bq.http(query)
      return `/${this.domain}/page/${number}/${httpQuery}`
    }



    get numbers(){

      let total = this.pagination.totalPage;
      let numbers = [];
      for(let i = 1;i <= total ;i++){
        let active = ( i === this.pagination.currentPage) ? "active" : "" ;
        numbers.push({ link : this.format(i)  , num : i ,active : active });
      }
      return numbers;
    }   


}
</script>