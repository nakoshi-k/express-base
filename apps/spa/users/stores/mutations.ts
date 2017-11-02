import {mutations as core_mutations} from "../../../../core/spa/stores/mutations"

export class mutations extends core_mutations{
    private _mount;
    private _resource;
    constructor(options){
      super()
      this._mount = options.mount
      this._resource = options.resource
    } 

    setEntities = ( state , paginate ) => {
      state.entities = paginate[this._resource]
      state.page = paginate.page
    }
    

    setEntity =  ( state , entity) => {
      if(this.isServer()){
        entity = JSON.parse( JSON.stringify(entity) )
      }
      for(let k in entity){
         if( typeof entity[k] === "string" ){
            state.entity[k] = entity[k]
            continue
         }
         if( typeof entity[k] === "object" && typeof state.entity[k] === "object" ){
            state.entity[k] = Object.assign( state.entity[k] , entity[k] );
         }
      }
    }

    updateEntity = ( state , kv : {key:string,value:string} ) => {
      let key = kv.key
      let value : any = kv.value
      if( key.indexOf(".") > -1){
        let sp = key.split(".");
        key = sp.shift();
        for(let i = 0 ; i < sp.length;i++){
          let ne = {}
          ne[ sp[i] ] = value
          value = ne; 
        }
      }
      state.entity[ key ] = value
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