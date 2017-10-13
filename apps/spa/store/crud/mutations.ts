import {mutations as core_mutations} from "../mutations"

export class mutations extends core_mutations{
    private _entities;
    private _entity;
    constructor(ssr){
      super(ssr);
      this._entities = ssr.entities
      this._entity = ssr.entity
    } 
    
    setEntities = ( state , paginate ) => {
      state.entities = paginate[this._entities];
      state.page = paginate.page;
    }
    
    setEntity =  ( state , response) => {
      state.entity = response;
    }

    updateEntity = ( state , kv : {key:string,value:string} ) => {
      state.entity[ kv.key ] = kv.value;
    }

}