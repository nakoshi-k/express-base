<template>
<div class="from-select">
    <select :name="name" @focus.capture="read_source" :disabled="disabled" ref="select" :class="validationClass(errors,name)" @change="change">
        <option :value="select.value" :selected="true">{{select.key}}</option>
        <option v-for="option in options" :value="option.value" :selected="option.selected">{{option.key}}</option>
    </select>
</div>
</template>
    
<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Component from 'vue-class-component';
import form_validation from "../../../utilities/validation"
import {client_fetch} from "../../../resources/client_fetch"
let cf  = new client_fetch();

@Component({
    name: 'select',
    computed :{},
    props: {
        value : String,
        name : String,
        select : {},
        errors: {},
    },
    methods : {
        ...form_validation.map(["validationClass"])
    }
})

export default class select extends Vue {

    options = []
    
      
    beforeRouteEnter(){
        console.log("before")
    }

    created(){
        
    }
    
    read_source(){
        let url = "/api/groups/list"
        let _this = this;
        cf.fetch(url,{}).then((r) => {
            let ops = r.filter((v) => {
               return v.value !== _this.value
            })
            this.options = ops
        }).catch(e => {
            console.log(e)
        })
        return false;
        
    }

    change(e){
        this.$emit('change', e )
    }

}
</script>