import {state as core_state} from "../../../../base/spa/stores/state";
export class state extends core_state{
    constructor(options){
      super()
    }
    close = false;
    show = false;
    template = "";
}