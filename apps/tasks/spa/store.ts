import Vue from 'vue';
import Vuex from 'vuex';
import {Internal} from './api';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Vuex)

export function createStore(options : createOptionsInterFace = createOptions){ 

  let api = new Internal({
    host:options.host,
    entities:options.entities,
    entity:options.entity,
    server: {request : options.server.request},
  });

  let state = {
      domain : options.entities,
      tasks : [],
      task:{},
  };

  let actions = {
    fetchEntities  : ( {commit},query = {page : 1, search : ""}) => {
      return  api.paginate(query).then((paginate) => {
        commit("setEntities",paginate);
      })
    }
  };

  let mutations = {
    setEntities : ( state , paginate ) => {
      state.tasks = paginate.tasks;
      state.page = paginate.page;
    },
  }
  let getters = {
    domain : (state) => {
      return state.domain;
    }
  }
  let vuex : Vuex.StoreOptions<any> =  {
    state : state ,
    actions: actions ,
    mutations:mutations,
    getters:getters
  }
  return new Vuex.Store(vuex);
}
