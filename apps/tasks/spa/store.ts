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
      overLay: false,
      loading : false,
      modal : {
        show : false,
        template : "",
        data : {}
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


  let setIndicator = (indicator , status ,complate) =>  {
    let before = indicator.complate;
    indicator.status = status;
    if(complate >= 100){
      indicator.prosess = false;
      setTimeout( () => {
        indicator.status = "primary";
      },500);
    }else{
      indicator.prosess = true  ;
    }
    
    if(before > complate ){
      indicator.show = false;
      indicator.complate = 0;
      setTimeout( () => {
        indicator.show = true;
        indicator.complate = complate;
      },1)
      return;
    }
    
    indicator.show = true;
    indicator.complate = complate;
  }


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
    loading : (state) => {
        setIndicator(state.indicator,"success" , 8);
        state.overLay = true;
        state.loading = true;
    },
    endLoading : (state , status ) => {
      setIndicator(state.indicator,"success" , 100);
      state.loading = false;
      state.overLay = false;
    },
    openModal(state,{ template , data }:{template : string , data : {any}}){
      state.modal.template = template;
      state.modal.data = data;
      state.modal.show = true;
    },
    closeModal(state){
      state.modal.template = "";                                                                                                                                                                                              
      state.modal.show = false;                                                                                                                                                                                              
    },
    setIndicator({indicator},{status,complate}){
      setIndicator(indicator,status,complate)
    }
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
    getters:getters
  }
  return new Vuex.Store(vuex);
}
