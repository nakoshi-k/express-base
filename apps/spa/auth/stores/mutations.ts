import {mutations as core_mutations} from "../../../../core/spa/stores/mutations"

export class mutations extends core_mutations{
    
  constructor(options){
      super();
  }

  setAuthUser = ( state , user ) => {
    state.auth_status = true
    state.user = user
  
  }
  restAuthUser = (state) => {
    state.auth_status = false
    for(let k in state.user){
      state.user[k] = null
    }
  }

}