import {actions as core_actions} from "../actions"
import {internal} from "../../api/internal"

export class actions extends core_actions{
    constructor(options){
        super();
   }

    fetchEntities  = ( {commit , getters},route) => {
        let api = getters.api;
        return api.paginate(route).then((paginate) => {
            commit("setEntities",paginate);
        })
    }
      
    fetchEntity = ( {commit,getters} ,route) => {
        let api = getters.api;
        return api.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }
    copyEntity = ( {commit ,getters} , copy ) => {
        let api = getters.api;
        let route = {
            params :{
                id : copy.id,
            },
            path : copy.mount + "/" + copy.id,
        }
        return  api.entity(route).then((entity) => {
            for(let key in entity){
                if(key === "id" || key === "updated_at" || key === "created_at"){
                    delete entity[key];
                }
            }
            commit("setEntity",entity);
        })
    }

    insertEntity = ( { state, commit ,getters } , token : string ) => {
        let api = getters.api;
        return api.insert(state.entity , state.mount , token);
    }

    saveEntity = ( {state,commit ,getters}, token) => {
        let api = getters.api;
        return  api.update(state.entity, state.mount ,token)
    }
    
    deleteEntity = ( {state,commit,getters}, delObj ) => {
        let api = getters.api;
        return  api.delete( delObj.id , delObj.mount ,delObj.token)
    }

    clearEntity = ({commit}) => {
        return Promise.resolve(commit("setClearEntity"));
    }
}