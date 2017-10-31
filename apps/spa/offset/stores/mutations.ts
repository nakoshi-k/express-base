import {mutations as core_mutations} from "../../../../core/spa/stores/mutations"

export class mutations extends core_mutations{
  constructor(options){
    super()
  }
  setOffset = (state,{template , data , show }:{template : string , data : {any} , show : boolean}) =>{
    state.template = template;
    state.data = data;
  }
  toggleOffset = (state) =>{
    if(!state.show){
      state.close = true;
    }
    state.show = ( state.show ) ? false : true; 
  }

  closeOffset = (state) => {
    state.show = false;                                                                                                                                                                                              
  }

  openOffset = (state) => {
    state.close = true;
    state.show = true;                                                                                                                                                                                              
  }

}