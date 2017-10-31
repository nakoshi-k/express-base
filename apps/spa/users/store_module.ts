import {store_module as core_module} from "../../../core/spa/stores/store_module"
import {mutations} from "./stores/mutations"
import {actions} from "./stores/actions"
import {state} from "./stores/state"
import {getters} from "./stores/getters"

import {internal_crud} from "../../resources/internal_crud"

export class store_module extends core_module{
    
    constructor( options ){
        super();
        this.state = new state( options).map("all")
        this.actions = new actions( options).map("all");
        this.mutations = new mutations( options).map("all");
        let local_getters = new getters( options).map("all");
        let crud = () => {
            return new internal_crud(options);
        }
        this.getters = { ...local_getters , crud : crud };
    }
}


