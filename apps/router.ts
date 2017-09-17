import { router as core_router} from "../base/core"
import { system } from "../base/core"
export class router extends core_router{
    public name = "router";
    constructor (){
        super();
        this.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname + system.ds 

        }
    } 
}