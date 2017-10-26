import {state as core_state} from "../../../../base/spa/stores/state";
export class state extends core_state{
    feeds = {}
    constructor(feeds){
        super();
        this.feeds = feeds;
    }

    auth_status = false;
    user = {
        id : "",
        name : "",
        mail : ""
    }
    
}