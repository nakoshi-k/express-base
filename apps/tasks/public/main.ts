
import Vue from 'vue';
// 拡張子をつける ./App → ./App.vue
import index from '../vue/index.vue';
import sub from '../vue/sub.vue';
import {pagination} from "../../../base/helper";
new Vue({
    el: '#application',
    components: {
    "tasks-index" : index ,
    "tasks-sub" : sub
    }
  })


