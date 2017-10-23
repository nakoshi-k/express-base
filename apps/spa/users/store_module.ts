import {store_module as core_module} from "../../../base/spa/stores/store_module"
import {mutations} from "./stores/mutations"
import {actions} from "./stores/actions"
import {state} from "./stores/state"
import {getters} from "./stores/getters"

import {internal_crud} from "../../resources/internal_crud"

export class store_module extends core_module{
    
    constructor( feeds ){
        super();
        this.state = new state( feeds ).map("all")
        this.actions = new actions( feeds ).map("all");
        this.mutations = new mutations( feeds ).map("all");
        let local_getters = new getters( feeds ).map("all");
        let crud = () => {
            return new internal_crud({
                endPoint : "/api/users",
                resource : "users",
                feeds:feeds 
            });
        }
        this.getters = { ...local_getters , crud : crud };
    }
}


