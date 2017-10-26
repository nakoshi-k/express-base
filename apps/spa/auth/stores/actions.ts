import {actions as core_actions} from "../../../../base/spa/stores/actions"
import {auth} from "../../../resources/auth"
let auth_api = new auth({});
export class actions extends core_actions{
    
    constructor(options){
        super();
    }
    
    fetchAuthUser = ( {commit , getters , state }) => {
        return auth_api.user(state.feeds).then(r => {
          commit("setAuthUser" , r)
        });
    }

    logout = ( {commit , getters , state }) => {
        return auth_api.logout().then(r => {
          commit("restAuthUser")
        });
    }

}