<template>
<div class="index">
    <div v-for="row in rows">{{row.title}}</div>
    <pagination :pagination="page"></pagination>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import pagination from './pagination.vue';

@Component({
  name: 'index',
  props: {
    csrf: String
  },
  components:{pagination}
})


export default class index extends Vue {
    csrf:string;
    rows = [{}];
    page = {};
    mounted(){
        this.load();
    }

    load(){
        fetch( "/tasks" , {
            credentials: 'same-origin' ,
            method: "get",
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'X-XSRF-Token': this.csrf,
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(response.status === 201){ 
                return response.json();
            };
            return response.json();
        }).then((json) => {
            this.rows = json.tasks;
            this.page = json.page;
        }).catch((err) => {

        });
    }
    pagination = "pagintaion";


}

</script>