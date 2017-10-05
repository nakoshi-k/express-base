<template>
<div class="index" :class="size">
    <div v-if="isLoad">
        <div v-for="row in rows">
            <h4><router-link :to="view(row.id)">{{row.title}}</router-link></h4>
            <router-link :to="edit(row.id)" class="button small">edit</router-link>
        </div>
        <pagination :pagination="pagination" v-on:movepage="load"></pagination>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import pagination from './pagination.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])

@Component({
  name: 'index',
  props: {
    csrf: String
  },
  components:{pagination}
})


export default class index extends Vue {
    isLoad = false;
    view (id){
        return `/tasks/${id}`;
    }
    
    edit (id){
        return `/tasks/${id}/edit`;
    }
    
    beforeRouteEnter(to, from, next){
        next(vm => {
            vm.load();
        })
    }

    size = {
      "column" : true,
      "column-75" : true,
    }

    csrf:string

    rows = [{}];
    pagination = {
      currentPage : 1,
      queryPrams : {},
      totalPage : 1
    };
    mounted(){
        this.load();
    }
    query(query){
        let prts = query;
        if(prts.length === 0){
            return "";
        }
        let q :string = "";
        Object.keys(prts).forEach(function(key) {
            q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
          });
        return q.replace("&","?");
    }

    pageUrl(){
        let page = "";
        if( Number(this.$route.params.page) > 1  ){
            page = "/page/" + this.$route.params.page + "/";
        }
        return "/tasks/" + page + this.query(this.$route.query);
    }

    load(){
        fetch( this.pageUrl() , {
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
            this.rows = json.tasks;
            this.pagination = json.page;
            this.isLoad = true;
        }).catch((err) => {

        });
    }

}

</script>