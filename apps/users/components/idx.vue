<template>
<div class="idx">
  <h2>Index</h2>
  <pagination :pagination="pagination" :mount="mount"></pagination>
  <div class="row border-bottom margin-top" v-for="entity in entities">
    <div class="column">
      <h3><router-link :to="view(entity.id)">{{ entity.title }}</router-link></h3>
    </div>
    <div class="column">
      <router-link :to="edit(entity.id)" class="button small"> <span class="typcn typcn-edit"></span> edit</router-link>
      <router-link :to="copy(entity.id)" class="button small"> <span class="typcn typcn-document-add"></span> copy</router-link>
      <button @click="destroy(entity.id,entity.title)" class="button small"> <span class="typcn typcn-document-delete"></span> delete</button>
    </div>
  </div>
  <pagination :pagination="pagination" :mount="mount"></pagination>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {pagination} from '../../spa/components/global'
import {mapGetters,mapState,mapMutations,mapActions} from "vuex"
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
    ...mapState( 'users' , {
      entities : ({entities}) => entities , 
      pagination: ({page}) => page,
      mount : ({mount}) => mount 
    }),
  },
  methods : {
    ...mapMutations( "modal" , ["setModal","toggleModal" , "openModal"] ),
    ...mapActions( "users" , 
      ["fetchEntities"]
    )
  },
  components:{pagination}
})

export default class idx extends Vue {
  

  mount:string
  pagination:any
  fetchEntities : (route) => {}
  asyncData ( {store,route} ) {
    return store.dispatch("users/fetchEntities" ,route)
  }

 
  view(id){
    return `${this.mount}/${id}`
  }

  edit(id){
    return `${this.mount}/${id}/edit`
  }

  setModal:(modal) => {}
  toggleModal:() => {}
  openModal:() => {}

  destroy(id : string , title : string){
    let modal = { 
      template : "Destroy" , 
      data : {
        id : id,
        name : title,
        mount : this.mount
      }
      }
    this.setModal(modal)
    this.openModal()
  }

  copy(id:string){
     return `${this.mount}/add?copy=${id}`
  }

  
}
</script>
