import {state as core_state} from "../../../../core/spa/stores/state";
export class state extends core_state{
    mount = ""
    constructor(options){
        super();
        this.mount = options.resource
    }
    
    association = {
        hasMany : ["user_profiles"],
        belongsTo : ["groups"]
    }
    
    entities = []
    entity = {
        group:
        {
            id : null
        },
        user_profile :{
            id : null
        }
    }

    page = {
        totalPage: 1,
        currentPage: 1,
        queryPrams: {} 
    }

}