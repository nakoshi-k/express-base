import Vue from 'vue';
import Vuex from 'vuex';
import {createOptionsInterFace,createOptions} from "./Interface";
Vue.use(Vuex);

class base{
  constructor (){
    let self = this;
    let member = {};
    Object.keys(self).forEach(function (key) {
      if(key.substring(0,1) !== "_"){
        state[key] = self[key];
      }
    });
    return state;
  }
}

export class state extends base{
}

export class actions extends base{

}

export class mutations extends base{

}

export class store {
  state:{};
  actions:{};
  mutations:{};
  public store = () => {
    let vuex: Vuex.StoreOptions<any> = {
      state : this.state,
      actions : this.actions,
      mutations : this.mutations
    }
    return new Vuex.Store(vuex)
  }
  constructor(state,actions,mutations) {
    this.state = state
    this.actions = actions
    this.mutations = mutations
  }
}
