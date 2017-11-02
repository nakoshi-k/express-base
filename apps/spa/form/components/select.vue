<template>
<div class="from-select">
    <select :name="name" :value="value" :class="validationClass(errors,name)" @change="change">
    <option v-for="option in options" :value="option.value">
        {{ option.text }}
    </option>
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
        text : String,
        errors: {}
    },
    methods : {
        ...form_validation.map(["validationClass"])
    }
})

export default class select extends Vue {

    options = [
    ]

    mounted() {
        this.options.push({text : this.text , value : this.value })
    }

    change(e){
        this.$emit('change', e )
    }

}
</script>