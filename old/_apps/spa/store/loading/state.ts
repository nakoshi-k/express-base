import {state as core_state} from "../state";
export class state extends core_state{
    constructor(options){
        super();
    }
    overLay = false;
    loading = false;
    indicator = {
        show : false,
        status : "success",
        complate : 0,
        prosess : true
    }
}