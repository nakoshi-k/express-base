import {actions as core_actions} from "../actions"
import {internal} from "../../api/internal"
let api;
export class actions extends core_actions{
    constructor(ssr){
        super(ssr);
        api = new internal({
            host:ssr.host,
            entities:ssr.entities,
            entity:ssr.entity,
            server: {request : ssr.server.request},
          });
    }

    fetchEntities  = ( {commit},route) => {
        console.log(this);
        return api.paginate(route).then((paginate) => {
            commit("setEntities",paginate);
        })
    }
      
    fetchEntity = ( {commit} ,route) => {
        return  api.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }
    
    insertEntity = ( {commit}, route) => {
        return api.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }

    saveEntity = ( {commit}, route) => {
        return  api.entity(route).then((entity) => {
            commit("setEntity",entity);
        })
    }

}