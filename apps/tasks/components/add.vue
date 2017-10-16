<template>
<div class="resource column column-75">
  <h2>Add</h2>
  <form action="./" method="post">
    <input type="hidden" name="_csrf" :value="token">
    <div class="form-item">
      <label for="title">title</label>
      <input type="text" name="title" @change="change" :value="entity.title" placeholder="title">
    </div>
    <div class="form-item">
      <label for="priod">priod</label>
      <input type="text" name="priod" @change="change" class="calendar" :value="entity.priod" placeholder="priod">
    </div>
    <button type="button" @click="save()" >submit</button>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import * as flatpickr from "flatpickr";
import * as confirmDatePlugin from "../../../node_modules/flatpickr/src/plugins/confirmDate/confirmDate.js";

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
      ["updateEntity"]
    ),
    ...mapMutations( "loading" , 
      ["loading","endLoading"]
    )
  }
})

export default class add extends Vue {
  /*from mutations */
  updateEntity:(kv) => {}//from mutations
  insertEntity:any;//from mutations
  loading:() => {};
  endLoading:(status:string) => {};
  token : string;
  mount : string
  clearEntity:() => {}
  
  entity : {
    title : "",
    priod : ""
  }
   
  change = (e) => {
    let kv = {}
    kv["key"] = e.target.name;
    kv["value"] = e.target.value;
    this.updateEntity(kv);
  }

  copyEntity:(any) => {};
  mounted(){
    if(window){
      flatpickr(".calendar" , {
        "enableTime": true,
        "plugins": [confirmDatePlugin({})]
      });
    }
    this.clearEntity();
    let query = this.$store.state.route.query;
    if(query["copy"]){
      this.copyEntity({ id : query["copy"] , mount : this.mount });
    }
  }

  beforeDestroy(){
    this.clearEntity();
  }
  
 save(){
    this.loading();
    this.insertEntity(this.token).then(r => {
      this.endLoading("success");
      this.$router.push({path : this.mount})
    }).catch( e=> {
      this.endLoading("warning");
    });
    return false;
  }

}
</script>
