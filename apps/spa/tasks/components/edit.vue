<template>
<div class="edit">
  <h2>Edit</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <fieldset>
      <input type="hidden" name="id" @change="change" :class="validationClass( errors , 'id')" :value="entity.id">

      <div class="form-item">
        <label for="title">Title</label>
        <input type="text" name="title" @change="change" :class="validationClass( errors , 'title')" :value="entity.title" placeholder="title">
        <div class="errors" v-for="e in errors.title"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="priod">Priod</label>
        <input class="calendar" type="datetime-local" name="priod" @change="change" :class="validationClass( errors , 'priod')" :value="entity.priod" placeholder="priod">
        <div class="errors" v-for="e in errors.priod"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>
    </fieldset>
    <button type="submit" :class="validationClass(errors,'submit')">update</button>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import * as flatpickr from "flatpickr"
import * as confirmDatePlugin from "../../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js"
import form_validation from "../../../utilities/validation"


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
  name : "edit",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("tasks" , {
        entity : ({entity}) =>  entity,
        mount : ({mount}) => mount 
    }),
  },
  methods : {
    ...mapActions( "tasks" , 
      ["fetchEntity" , "saveEntity"]
    ),
    ...mapMutations( "tasks" , 
      ["updateEntity"]
    ),
    ...mapMutations( "loading" , 
      ["loading","endLoading"]
    ),
    ...form_validation.map(["validationClass"])
  }

})

export default class edit extends Vue {
  mount:string
  entity:{
    id : string,
    title : string,
    priod : string,
  }
  asyncData ({ store, route }) {
    return store.dispatch('tasks/fetchEntity' , route )
  }
 
  get action(){
    return `${this.mount}/${this.entity.id}`

  }
  updateEntity:(kv) => {}
  change = (e) => {
    let kv = {}
    kv["key"] = e.target.name
    kv["value"] = e.target.value
    this.updateEntity(kv)
  }

  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      })
    }
  }
  token : string
  saveEntity:(token : string) => Promise<string>
  loading : () => {}
  endLoading: (status) => {}
  errors = {}
  save(){
    this.loading()
    this.saveEntity(this.token).then(r => {
      this.errors = {}
      this.endLoading("success")
    }).catch(e => {
      this.errors = e
      this.endLoading("warning")
    })
  }
  

}
</script>
