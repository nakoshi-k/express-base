import {actions as core_actions} from "../../../../base/spa/stores/actions"
export class actions extends core_actions{
    
    constructor(options){
        super();
    }
    
    fetchAuthUser = ( {commit , getters , state }) => {
        let api = getters.api;
        return api.user().then(r => {
          commit("setAuthUser" , r)
        });
    }

    logout = ( {commit , getters , state }) => {
        let api = getters.api;
        return api.logout().then(r => {
          commit("restAuthUser")
        });
    }

}