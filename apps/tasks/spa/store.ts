import Vue from 'vue';
import Vuex from 'vuex';
import {Internal} from './api';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Vuex)

let increment = ( state ) => {
  state.count++
}


export function createStore(options : createOptionsInterFace = createOptions){ 
  let api = new Internal({
    host:options.host,
    entities:options.entities,
    entity:options.entity,
    request:options.request
  }
  );
  
  let vuex : Vuex.StoreOptions<any> =  {
    state : {
      domain : options.entities
    },
    actions:{
      fetchEntities ( {commit},query = {page : 1, search : ""}){
        return  api.entities(query).then((entities) => {
          commit("setEntities",entities)
        })
      }
    },
    mutations: {
      setEntities : ( state , entities ) => {
          let tasks = entities.tasks;
          state.tasks = entities.tasks;
          state.page = entities.page;
      },
    }
  } 
  return new Vuex.Store(vuex);
}