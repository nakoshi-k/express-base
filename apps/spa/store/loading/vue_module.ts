import {vue_module as core_module} from "../vue_module"
import {mutations} from "./mutations"
import {actions} from "./actions"
import {state} from "./state"
import {getters} from "./getters"


export class vue_module extends core_module{
    
    constructor(ssr){
        super(ssr);
        this.state = new state(ssr).map("all");
        this.actions = new actions(ssr).map("all");
        this.mutations = new mutations(ssr).map("all");
        this.getters = new getters(ssr).map("all");
    }

}


