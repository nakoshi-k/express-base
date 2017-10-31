import {core_service} from "../core/core_service"
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