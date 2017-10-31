import {actions as core_actions} from "../../../../core/spa/stores/actions"
export class actions extends core_actions{
    
    constructor(options){
        super();
    }
    
    fetchAuthUser = ( {commit , getters , state }) => {
        let api = getters.api;
        return api.user().then(r => {
          commit("setAuthUser" , r)
        }).catch(e => {
            console.log(e)
            return Promise.resolve()
        });
    }

    logout = ( {commit , getters , state }) => {
        let api = getters.api;
        return api.logout().then(r => {
          commit("restAuthUser")
        });
    }

}