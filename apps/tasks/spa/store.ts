import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

let entities = "tasks";
let entity = "task  ";

let increment = ( state ) => {
  state.count++
}

let page = ({commit , state} , query = {page : 1, search : ""} ) => {

  fetch( `/${entities}/page/${query.page}${query.search}` , {
      credentials: 'same-origin' ,
      method: "get",
      headers: {
      'X-Requested-With': 'XMLHttpRequest' ,
      'Content-Type': 'application/json'
      }
  })
  .then((response) => {
      if(response.status === 201){ 
          return  response.json();
      };
      throw Error;
  }).then((data) => {
     commit("page" , data);
  }).catch((err) => {
      console.log(err);
  });
}

export function createStore(){
    return new Vuex.Store({
        state: {
          count: 0,
          tasks : [],
          task:{},
          page:{}
        },
        mutations: {
          increment : increment,
          page : ( state , data ) => {
              state.tasks = data.tasks;
              state.page = data.page;
              console.log(state);
          }
        },
        actions:{
          page : page
        }
 })
}