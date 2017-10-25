import { service as core_service} from "../base/core"
import {authorization} from "./lib/authorization"
export class service extends core_service{
    public name = "service";
    public auth:authorization;
    constructor(name:string){
        super(name);
        /* auth */
        this.auth = new authorization();
        /* activate local */
        this.auth.local();

        

    }

}