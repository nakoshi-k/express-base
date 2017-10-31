import {store_module as core_module} from "../../../core/spa/stores/store_module"
import {mutations} from "./stores/mutations"
import {actions} from "./stores/actions"
import {state} from "./stores/state"
import {getters} from "./stores/getters"
import {auth} from "../../resources/auth"
export class store_module extends core_module{
    
    constructor( options ){
        super();
        this.state = new state( options ).map("all");
        this.actions = new actions( options ).map("all");
        this.mutations = new mutations( options ).map("all");
        let lgetters =  new getters( options ).map("all");
        this.getters = { ...lgetters , feeds : function(){return options} };
        let local_getters = new getters( options ).map("all");
        let api = () => {
            return new auth(options);
        }
        this.getters = { ...local_getters , api : api };

    }

}


