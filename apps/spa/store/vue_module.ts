import vuex ,{Action,Dispatch,Store,Getter} from "vuex";
export class vue_module{
    protected _state:{key?:any};
    protected _actions:{key?:Action<any,any>};
    protected _mutations:{key?:Dispatch};
    protected _getters:{key?:Getter<any,any>};
    
    constructor(ssr){

    }
    
    set state(state:{key?:any}){
        this._state = state
    }
    set actions(actions:{key?:Action<any,any>}){
        this._actions = actions
    }
    set mutations(mutations:{key?:Dispatch}){
        this._mutations = mutations 
    }
    set getters(getters:{key?:Getter<any,any>}){
        this._getters = getters 
    }
    
    create(){
        return {
           namespaced : true,
           state : this._state,
           actions : this._actions,
           mutations : this._mutations,
           getters : this._getters,
        }
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