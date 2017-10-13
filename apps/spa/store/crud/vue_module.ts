import {vue_module as core_module} from "../vue_module"
import {mutations} from "./mutations"
import {actions} from "./actions"
import {state} from "./state"
import {getters} from "./getters"


export class vue_module extends core_module{
    
    constructor( options ){
        super();
        this.state = new state( options ).map("all");
        this.actions = new actions( options ).map("all");
        this.mutations = new mutations( options ).map("all");
        this.getters = new getters( options ).map("all");
    }

}


