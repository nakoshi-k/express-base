import Vue from 'vue';
import Vuex from 'vuex';
import {Internal} from './api';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Vuex)
import { indicator as indicatorClass } from "./mutations/indicator"; 

export function createStore(options : createOptionsInterFace = createOptions){ 

  let api = new Internal({
    host:options.host,
    entities:options.entities,
    entity:options.entity,
    server: {request : options.server.request},
  });

  let state = {
      domain : options.entities,
      overLay: false,
      loading : false,
      modal : {
        close : false,
        show : false,
        template : "",
        data : {
          id : "",
          name : ""
        }
      },
      indicator:{
        show : false,
        status : "success",
        complate : 0,
        prosess : true
      },
      tasks : [],
      task:{},
      page:{
        totalPage: 1,
        currentPage: 1,
        queryPrams: {} 
      }
  };

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


  let indicator = new indicatorClass();

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
    setModal:(state,{template , data , show }:{template : string , data : {any} , show : boolean}) =>{
      state.modal.template = template;
      state.modal.data = data;
    },
    toggleModal(state){
      if(!state.modal.show){
        state.modal.close = true;
      }
      state.modal.show = ( state.modal.show ) ? false : true; 
    },
    closeModal(state){
      state.modal.template = "";                                                                                                                                                                                              
      state.modal.show = false;                                                                                                                                                                                              
    },
    ...indicator.map( ["setIndicator" , "loading" , "endLoading"] )
  }

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
    actions: actions ,
    mutations:mutations,
    getters: getters
  }

  return new Vuex.Store(vuex);
}
