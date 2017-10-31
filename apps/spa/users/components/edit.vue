<template>
<div class="edit">
  <h2>Edit</h2>
  <form :action="action" method="post" v-on:submit.prevent="save">
    <fieldset>
      <input type="hidden" name="id" @change="change" :class="validationClass( errors , 'id')" :value="entity.id">

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
        <form-select name="group_id" :errors="errors" @change="change" :value="entity.group_id" ></form-select>
        <div class="errors" v-for="e in errors.group_id"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>

      <div class="form-item">
        <label for="new_password">New password</label>
        <input type="password" name="new_password" @change="change" :class="validationClass( errors , 'new_password')" :value="entity.new_password" placeholder="new_password">
        <div class="errors" v-for="e in errors.new_password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
        <div class="errors" v-for="e in errors.isEvenPassword"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
      </div>

      <div class="form-item">
        <label for="confirm_password">Confirm password</label>
        <input type="password" name="confirm_password" @change="change" :class="validationClass( errors , 'confirm_password')" :value="entity.confirm_password" placeholder="confirm_password">
        <div class="errors" v-for="e in errors.confirm_password"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
        <div class="errors" v-for="e in errors.isEvenPassword"> <span class="typcn typcn-warning-outline"></span> {{e.message}} </div>
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
import select from "../../form/components/select"



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
  components : {
    "form-select" : select
  },
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
      ["fetchEntity" , "saveEntity"]
    ),
    ...mapMutations( "users" , 
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
    return store.dispatch('users/fetchEntity' , route )
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
