import {mutations as core_mutations} from "../../../../base/spa/stores/mutations"

export class mutations extends core_mutations{
    private _mount;
    private _resource;
    constructor(options){
      super()
      this._mount = options.mount
      this._resource = options.resource
    } 
    
    setEntities = ( state , paginate ) => {
      console.log(this._resource)
      state.entities = paginate[this._resource]
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