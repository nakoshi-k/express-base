import {mutations as core_mutations} from "../mutations"

export class mutations extends core_mutations{
    constructor(options){
      super()
    }

    setIndicator = ( {indicator} , {status ,complate} ) =>  {
        let before = indicator.complate;
        indicator.status = status;
        indicator.show = true;
        indicator.complate = complate;

        if(complate >= 100){
          indicator.prosess = false;
          indicator.status = "primary";
        }else{
          indicator.prosess = true;
        }
     }

     loading = (state , status) => {
        this.setIndicator(state ,{status : status , complate : 3});
        state.overLay = true;
        state.loading = true;
     }

     endLoading = (state , status ) => {
        this.setIndicator(state , { status : status , complate : 100});
        state.loading = false;
        state.overLay = false;
     }

}