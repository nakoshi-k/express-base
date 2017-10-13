import {state as core_state} from "../state";
export class state extends core_state{
    
    constructor(ssr){
        super(ssr);
    }

    entities = [];
    entity = {}
    page = {
        totalPage: 1,
        currentPage: 1,
        queryPrams: {} 
    }
}