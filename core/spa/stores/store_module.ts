import vuex ,{Action,Dispatch,Store,Getter} from "vuex";
export class store_module{
    protected _state:{key?:any};
    protected _actions:{key?:Action<any,any>};
    protected _mutations:{key?:Dispatch};
    protected _getters:{key?:Getter<any,any>};
    
    
    set state(state:{}){
        this._state = state
    }
    set actions(actions:{}){
        this._actions = actions
    }
    set mutations(mutations:{}){
        this._mutations = mutations 
    }
    set getters(getters:any){
        this._getters = getters 
    }
    


    store(){
        return {
            namespaced : true,
            state : this._state,
            actions : this._actions,
            mutations : this._mutations,
            getters : this._getters,
            }
    }

}