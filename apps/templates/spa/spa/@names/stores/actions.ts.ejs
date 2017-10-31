import {actions as core_actions} from "../../../../core/spa/stores/actions"

export class actions extends core_actions{
    constructor(feeds){
        super();
   }

    fetchEntities  = ( {commit , getters , state },route) => {
        let crud = getters.crud;
        return crud.paginate(route).then((paginate) => {
            commit("setEntities",paginate);
        })
    }
      
    fetchEntity = ( {commit,getters ,state} ,route) => {
        let crud = getters.crud;
        return crud.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }
    copyEntity = ( {commit ,getters , state} , copy ) => {
        let route = {
            params :{
                id : copy.id,
            },
            path : copy.mount + "/" + copy.id,
        }
        let crud = getters.crud;
        return  crud.entity(route).then((entity) => {
            for(let key in entity){
                if(key === "id" || key === "updated_at" || key === "created_at"){
                    delete entity[key];
                }
            }
            commit("setEntity",entity);
        })
    }

    insertEntity = ( { state, commit ,getters } , token : string ) => {
        let crud = getters.crud;
        return crud.insert(state.entity,token);
    }

    saveEntity = ( {state,commit ,getters}, token) => {
        let crud = getters.crud;
        return  crud.update(state.entity,token)
    }
    
    deleteEntity = ( {state,commit,getters}, delObj ) => {
        let crud = getters.crud;
        return  crud.delete( delObj.id , delObj.token)
    }

    clearEntity = ({commit}) => {
        return Promise.resolve(commit("setClearEntity"));
    }

}