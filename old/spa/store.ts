import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import {createOptionsInterFace,createOptions} from "./Interface";
/* api */
import {Internal} from './api';

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

  let api = new Internal({
    host:options.host,
    entities:options.entities,
    entity:options.entity,
    server: {request : options.server.request},
  });

  let state = {
      domain : options.entities,
      /*
      tasks : [],
      task:{},
      page:{
        totalPage: 1,
        currentPage: 1,
        queryPrams: {} 
      }
      */
  };

  /*
  let actions = {
    fetchEntities  : ( {commit},route) => {
      return api.paginate(route).then((paginate) => {
          commit("setEntities",paginate);
      })
    },
    fetchEntity : ( {commit} ,route) => {
      return  api.entity(route).then((entity) => {
          commit("setEntity",entity);
      })
    },
    insertEntity : ( {commit}, route) => {
      return api.entity(route).then((entity) => {
          commit("setEntity",entity);
      })
    },
    saveEntity : ( {commit}, route) => {
      return  api.entity(route).then((entity) => {
          commit("setEntity",entity);
      })
    }
  };



  let mutations = {
    setEntities : ( state , paginate ) => {
      state.tasks = paginate.tasks;
      state.page = paginate.page;
    },
    setEntity: ( state , entity) => {
      state.task = entity;
    },
    updateEntity : (state , kv : {key:string,value:string} ) => {
      state.task[ kv.key ] = kv.value;
    },

  }
  */
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
