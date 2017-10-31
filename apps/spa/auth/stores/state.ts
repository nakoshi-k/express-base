import {state as core_state} from "../../../../core/spa/stores/state";
export class state extends core_state{
    constructor(options){
        super();
    }

    auth_status = false;
    user = {
        id : "",
        name : "",
        mail : ""
    }
    
}