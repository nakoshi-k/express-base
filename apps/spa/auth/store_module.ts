import {store_module as core_module} from "../../../base/spa/stores/store_module"
import {mutations} from "./stores/mutations"
import {actions} from "./stores/actions"
import {state} from "./stores/state"
import {getters} from "./stores/getters"

export class store_module extends core_module{
    
    constructor( feeds ){
        super();
        this.state = new state( feeds ).map("all");
        this.actions = new actions( feeds ).map("all");
        this.mutations = new mutations( feeds ).map("all");
        this.getters = new getters( feeds ).map("all");
    }

}


