<template>
<div class="resource column column-75">
  <h2>Index</h2>
  <div>
    <div v-for="entity in entities">
    <h3><router-link :to="view(entity.id)">{{ entity.title }}</router-link></h3>
    <router-link :to="edit(entity.id)" class="button small">edit</router-link>
    <button @click="destroy(entity.id,entity.title)" class="button small">delete</button>
    </div>
  </div>
  <pagination :pagination="pagination"></pagination>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import pagination from '../../spa/components/pagination.vue';
import {mapGetters,mapState,mapMutations,mapActions} from "vuex";
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
  name : "page",
  computed : {
    ...mapGetters([
      'domain'
    ]),
    ...mapState( 'tasks' , {
      entities : ({entities}) => entities , 
      pagination: ({page}) => page
    }),
  },
  methods : {
    ...mapMutations( "modal" , ["setModal","toggleModal"] ),
    ...mapActions( "tasks" , 
      ["fetchEntities"]
    )
  },
  components:{pagination}
})

export default class Page extends Vue {
  

  domain:string;
  pagination:any;
  fetchEntities : (route) => {};
  asyncData ( {store,route}) {
    return store.dispatch("tasks/fetchEntities" ,route);
  }

  mounted(){
    let pg = this.pagination;
    if(pg.currentPage > pg.totalPage){
      this.$router. push({ path: `/${this.domain}/page/${pg.totalPage}` });
    }
  }
 
  view(id){
    return `/${this.domain}/${id}`;
  }

  edit(id){
    return `/${this.domain}/${id}/edit`;
  }

  setModal:(modal) => {};
  toggleModal:() => {};

  destroy(id : string , title : string){
    let modal = { 
      template : "Destroy" , 
      data : {
        id : id,
        name : title
      }
      }
    this.setModal(modal);
    this.toggleModal();
  }

  
}
</script>
