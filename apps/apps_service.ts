import { service as core_service} from "../base/core"
import {authorization} from "./lib/authorization"
import * as sequelize from "sequelize"
export class service extends core_service{
    public name = "service";
    public auth:authorization;

    conditions : (req) => { where : sequelize.WhereLogic,limit:number,offset:number }

    constructor(name:string){
        super(name);
        /* auth */
        this.auth = new authorization();
        /* activate local */
        this.auth.local();

        

    }

}