import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {store_module as loading_module } from './loading/store_module';
import {store_module as modal_module } from './modal/store_module';
import {store_module as offset_module } from './offset/store_module';


import {store_module as tasks_module } from './tasks/store_module'
import {store_module as users_module } from './users/store_module'
import {store_module as auth_module} from './auth/store_module'

export function createStore( feeds ){ 
  let getters = {
    token : (state) => {
      if(typeof window === "undefined"){
        return ""
      }
      let body = document.getElementsByTagName("body")[0]
      let csrfToken = body.attributes["data-csrf-token"].value
      return csrfToken;
    }
  }

  let tasks = new tasks_module({ entities : "tasks" , endPoint : "/tasks" , ...feeds} ).store()
  let users = new users_module({ entities : "users" , endPoint : "/users" , ...feeds} ).store();
  let auth = new auth_module({ ...feeds} ).store();

  let loading = new loading_module({...feeds}).store();
  let modal = new modal_module({...feeds}).store();
  let offset = new offset_module({...feeds}).store();

let vuex : Vuex.StoreOptions<any> =  {
    getters: getters,
    modules:{
      "tasks" : tasks,
      "loading" : loading,
      "modal" : modal,
      "users" : users,
      "auth" : auth,
      "offset" : offset
    }
  }

  return new Vuex.Store(vuex)

}
