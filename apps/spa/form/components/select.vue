<template>
<div class="from-select">
    <select :name="name" :value="value" :class="validationClass(errors,name)" @change="change">
        <option disabled >Please select one</option>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
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

    change(e){
        this.$emit('change', e )
    }

}
</script>