<template>
<div class="add">
  <h2>Add</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <fieldset>

      <div class="form-item">
        <label for="title">Title</label>
        <input type="text" name="title" @change="change" :class="validationClass( errors , 'title')" :value="entity.title" placeholder="title">
        <div class="errors" v-for="e in errors.title"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="priod">Priod</label>
        <input class="calendar" type="text" name="priod" @change="change" :class="validationClass( errors , 'priod')" :value="entity.priod" placeholder="priod">
        <div class="errors" v-for="e in errors.priod"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>
    </fieldset>
    <button type="submit" :class="validationClass(errors , 'submit')">add</button>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import * as flatpickr from "flatpickr"
import * as confirmDatePlugin from "../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js"
import form_validation from "../../spa/utility/validation"

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
  name : "add",
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
      ["insertEntity" , "clearEntity" ,"copyEntity"]
    ),
    ...mapMutations( "tasks" , 
      ["updateEntity" , "setErrors"]
    ),
    ...mapMutations( "loading" , 
      ["loading","endLoading"]
    ),
    ...form_validation.map(["validationClass"])
  }
})

export default class add extends Vue {
  /*from mutations */
  updateEntity:(kv) => {}//from mutations
  insertEntity:any;//from mutations
  loading:() => {}
  endLoading:(status:string) => {}
  token : string
  mount : string
  clearEntity:() => {}
  
  get action(){
    return `${this.mount}`
  }

  entity : {
    title : "",
    priod : ""
    errors : {}
  }
   
  change = (e) => {
    let kv = {}
    kv["key"] = e.target.name
    kv["value"] = e.target.value
    this.updateEntity(kv)
  }

  copyEntity:(any) => {}
  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      })
    }
    this.clearEntity()
    let query = this.$store.state.route.query
    if(query["copy"]){
      this.copyEntity({ id : query["copy"] , mount : this.mount })
    }
  }

  beforeDestroy(){
    this.clearEntity()
  }
  
  errors = {}

  save(){
    this.loading()
    this.insertEntity(this.token).then(r => {
      this.endLoading("success")
      this.$router.push({path : this.mount})
    }).catch( e => {
      this.errors = e
      this.endLoading("warning")
    })
    return false
  }

}
</script>
