import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import {createOptionsInterFace,createOptions} from "./interface/interface";

import {vue_module as loading } from './store/loading/vue_module';
import {vue_module as modal } from './store/modal/vue_module';
import {vue_module as crud } from './store/crud/vue_module';

export function createStore(options : createOptionsInterFace = createOptions){ 

  let ssr = {
      host:options.host,
      entities:options.entities,
      entity:options.entity,
      server: {request : options.server.request},
  } 

  let state = {
      domain : options.entities,
 };

  let getters = {
    domain : (state) => {
      return state.domain;
    },
    token : (state) => {
      if(typeof window === "undefined"){
        return "";
      }
      let body = document.getElementsByTagName("body")[0];
      let csrfToken = body.attributes["data-csrf-token"].value;
      return csrfToken;
    }
  }

  
  let vuex : Vuex.StoreOptions<any> =  {
    state : state ,
    getters: getters,
    modules:{
      "loading" : new loading(ssr).store(),
      "modal" : new modal(ssr).store(),
      "tasks" : new crud(ssr).store()
    }
  }

  return new Vuex.Store(vuex);

}
