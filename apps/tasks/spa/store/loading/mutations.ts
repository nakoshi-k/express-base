import {mutations as core_mutations} from "../mutations"

export class mutations extends core_mutations{
    constructor(ssr){
      super(ssr)
    }
    setIndicator = ( {indicator} , {status ,complate} ) =>  {
        let before = indicator.complate;
        indicator.status = status;
        if(complate >= 100){
          indicator.prosess = false;
          setTimeout( () => {
            indicator.status = "primary";
          },500);
        }else{
          indicator.prosess = true  ;
        }
        if(before > complate ){
          indicator.show = false;
          indicator.complate = 0;
          setTimeout( () => {
            indicator.show = true;
            indicator.complate = complate;
          },1)
          return;
        }
        indicator.show = true;
        indicator.complate = complate;
     }

     loading = (state) => {
        this.setIndicator(state ,{status : "success" , complate : 8});
        state.overLay = true;
        state.loading = true;
     }

     endLoading = (state , status ) => {
        this.setIndicator(state , { status : status , complate : 100});
        state.loading = false;
        state.overLay = false;
     }

}