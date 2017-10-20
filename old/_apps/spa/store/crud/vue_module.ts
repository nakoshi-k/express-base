import {vue_module as core_module} from "../vue_module"
import {mutations} from "./mutations"
import {actions} from "./actions"
import {state} from "./state"
import {getters} from "./getters"
import {internal} from "../../api/internal"


export class vue_module extends core_module{
    
    constructor( options ){
        super();
        this.state = new state( options ).map("all");
        this.actions = new actions( options ).map("all");
        this.mutations = new mutations( options ).map("all");
        let gettersInstance = new getters( options ).map("all");

        let api = function() {
            return new internal( {
            host: options.host,
            endPoint : options.endPoint,
            request:options.request ,
            service:options.service 
          } );
        }
        this.getters = {...gettersInstance , "api" : api };
    }

}


