"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
const Interface_1 = require("./Interface");
/* api */
const api_1 = require("./api");
const vue_module_1 = require("./store/loading/vue_module");
const vue_module_2 = require("./store/modal/vue_module");
const vue_module_3 = require("./store/crud/vue_module");
function createStore(options = Interface_1.createOptions) {
    let ssr = {
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        server: { request: options.server.request },
    };
    let api = new api_1.Internal({
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        server: { request: options.server.request },
    });
    let state = {
        domain: options.entities,
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
        domain: (state) => {
            return state.domain;
        },
        token: (state) => {
            if (typeof window === "undefined") {
                return "";
            }
            let body = document.getElementsByTagName("body")[0];
            let csrfToken = body.attributes["data-csrf-token"].value;
            return csrfToken;
        }
    };
    let vuex = {
        state: state,
        getters: getters,
        modules: {
            "loading": new vue_module_1.vue_module(ssr).store(),
            "modal": new vue_module_2.vue_module(ssr).store(),
            "tasks": new vue_module_3.vue_module(ssr).store()
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
