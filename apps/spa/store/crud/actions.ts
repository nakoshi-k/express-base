import {actions as core_actions} from "../actions"
import {internal} from "../../api/internal"
let api;
export class actions extends core_actions{
    constructor(options){
        super();
        api = new internal( {
            host: options.host,
            endPoint : options.endPoint,
            request:options.request ,
            service:options.service 
          } );
    }

    fetchEntities  = ( {commit},route) => {
        return api.paginate(route).then((paginate) => {
            commit("setEntities",paginate);
        })
    }
      
    fetchEntity = ( {commit} ,route) => {
        return  api.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }
    
    insertEntity = ( {state, commit } , token : string ) => {
        return api.insert(state.entity , state.mount , token);
    }

    saveEntity = ( {state,commit}, token) => {
        return  api.update(state.entity, state.mount ,token)
    }
    
    deleteEntity = ( {state,commit}, delObj ) => {
        return  api.delete( delObj.id , delObj.mount ,delObj.token)
    }

    clearEntity = ({commit}) => {
        return Promise.resolve(commit("setClearEntity"));

    }
}