<template>
<div class="add">
  <h2>Add</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <fieldset>

      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" name="name" @change="change" :class="validationClass( errors , 'name')" :value="entity.name" placeholder="name">
        <div class="errors" v-for="e in errors.name"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>

      <div class="form-item">
        <label for="mail">Mail</label>
        <input type="email" name="mail" @change="change" :class="validationClass( errors , 'mail')" :value="entity.mail" placeholder="mail">
        <div class="errors" v-for="e in errors.mail"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>

      <div class="form-item">
        <label for="group_id">Group</label>
        <input type="text" name="group_id" @change="change" :class="validationClass( errors , 'group_id')" :value="entity.group_id" placeholder="group_id">
        <div class="errors" v-for="e in errors.group_id"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>


      <div class="form-item">
        <label for="new_password">Password</label>
        <input type="password" name="new_password" @change="change" :class="validationClass( errors , 'new_password')" :value="entity.new_password" placeholder="new_password">
        <div class="errors" v-for="e in errors.new_password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>

      <div class="form-item">
        <label for="confirm_password">Confirm password</label>
        <input type="password" name="confirm_password" @change="change" :class="validationClass( errors , 'confirm_password')" :value="entity.confirm_password" placeholder="confirm_password">
        <div class="errors" v-for="e in errors.confirm_password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
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
