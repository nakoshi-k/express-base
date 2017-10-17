import {mutations as core_mutations} from "../mutations"

export class mutations extends core_mutations{
    private _mount;
    private _entities;
    constructor(options){
      super()
      this._mount = options.mount
      this._entities = options.entities
    } 
    
    setEntities = ( state , paginate ) => {
      state.entities = paginate[this._entities]
      state.page = paginate.page
    }
    
    setEntity =  ( state , response) => {
      state.entity = response
    }

    updateEntity = ( state , kv : {key:string,value:string} ) => {
      state.entity[ kv.key ] = kv.value
    }
    
    setClearEntity = (state) => {
      let entity = state.entity;
      for(let key in entity){
        entity[key] = null;
        if(key === "id" || key === "created_at" || key === "updated_at" ){
          delete entity[key];
        }
        if(key === "errors" ){
          entity[key] = [];
        }
      }
    }

    setErrors = ( state , errors  ) => {
      state.entity[ "errors" ] = errors;
    }

}