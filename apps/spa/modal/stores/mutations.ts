import {mutations as core_mutations} from "../../../../core/spa/stores/mutations"

export class mutations extends core_mutations{
  constructor(options){
    super()
  }
  setModal = (state,{template , data , show }:{template : string , data : {any} , show : boolean}) =>{
    state.template = template;
    state.data = data;
  }
  toggleModal = (state) =>{
    if(!state.show){
      state.close = true;
    }
    state.show = ( state.show ) ? false : true; 
  }

  closeModal = (state) => {
    state.show = false;                                                                                                                                                                                              
  }

  openModal = (state) => {
    state.close = true;
    state.show = true;                                                                                                                                                                                              
  }

}