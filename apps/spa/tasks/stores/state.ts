import {state as core_state} from "../../../../core/spa/stores/state";
export class state extends core_state{
    mount = ""
    constructor(options){
        super();
        this.mount = options.resource
    }

    entities = []
    entity = {
    }
    page = {
        totalPage: 1,
        currentPage: 1,
        queryPrams: {} 
    }
    
}