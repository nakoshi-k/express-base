import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import {createOptionsInterFace,createOptions} from "./interface/interface";

import {vue_module as loading_module } from './store/loading/vue_module';
import {vue_module as modal_module } from './store/modal/vue_module';
import {vue_module as crud_module } from './store/crud/vue_module';

export function createStore(server){ 

  let getters = {
    token : (state) => {
      if(typeof window === "undefined"){
        return "";
      }
      let body = document.getElementsByTagName("body")[0];
      let csrfToken = body.attributes["data-csrf-token"].value;
      return csrfToken;
    }
  }
  let tasks = new crud_module({ entities : "tasks" , endPoint : "/tasks" , ...server} ).store();
  let loading = new loading_module({server}).store();
  let modal = new modal_module({server}).store();
  
  let vuex : Vuex.StoreOptions<any> =  {
    getters: getters,
    modules:{
      "loading" : loading,
      "modal" : modal,
      "tasks" : tasks
    }
  }

  return new Vuex.Store(vuex);

}