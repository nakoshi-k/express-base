<template>
<div class="from-select">
    <select :name="name" :value="value" :class="validationClass(errors,name)" @change="change">
        <option disabled >Please select one</option>
        <option v-for="(value,key) in options" :value="key">{{value}}</option>

    </select>
</div>
</template>
    
<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Component from 'vue-class-component';
import form_validation from "../../../utilities/validation"


@Component({
    name: 'select',
    computed :{},
    props: {
        value : String,
        name : String,
        errors: {}
    },
    methods : {
        ...form_validation.map(["validationClass"])
    }
})

export default class select extends Vue {

    options = {
        1: "A",
        2: "B",
        3: "C"
    }

    change(e){
        this.$emit('change', e )
    }

}
</script>