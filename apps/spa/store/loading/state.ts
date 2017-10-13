import {state as core_state} from "../state";
export class state extends core_state{
    constructor(ssr){
        super(ssr);
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