<template>
<div class="add">
  <h2>Add</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <fieldset>

      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" name="name" @change="change" :class="validationClass( errors , 'name')" :value="entity.name" placeholder="name">
        <div class="errors" v-for="e in errors.name"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="password">Password</label>
        <input type="text" name="password" @change="change" :class="validationClass( errors , 'password')" :value="entity.password" placeholder="password">
        <div class="errors" v-for="e in errors.password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="group_id">Group</label>
        <input type="text" name="group_id" @change="change" :class="validationClass( errors , 'group_id')" :value="entity.group_id" placeholder="group_id">
        <div class="errors" v-for="e in errors.group_id"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="access_token">Access token</label>
        <input type="text" name="access_token" @change="change" :class="validationClass( errors , 'access_token')" :value="entity.access_token" placeholder="access_token">
        <div class="errors" v-for="e in errors.access_token"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
      </div>

      <div class="form-item">
        <label for="refresh_token">Refresh token</label>
        <input type="text" name="refresh_token" @change="change" :class="validationClass( errors , 'refresh_token')" :value="entity.refresh_token" placeholder="refresh_token">
        <div class="errors" v-for="e in errors.refresh_token"> <span class="typcn typcn-warning-outline"></span> {{e.message}} ({{e.type}})</div>
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
    ...mapState("users" , {
        entity : ({entity}) =>  entity,
        mount : ({mount}) => mount 
    }),
  },
  methods : {
    ...mapActions( "users" , 
      ["insertEntity" , "clearEntity" ,"copyEntity"]
    ),
    ...mapMutations( "users" , 
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
