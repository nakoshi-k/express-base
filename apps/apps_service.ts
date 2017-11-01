import {core_service} from "../core/core_service"
import {authorization} from "./lib/authorization"
import * as sequelize from "sequelize"
export class service extends core_service{
    public name:string;
    public auth:authorization;
    parent:core_service;
    conditions : (req) => { where : sequelize.WhereLogic,limit:number,offset:number }

    constructor(name){
        super(name);
        /* auth */
        this.auth = new authorization();
        /* activate local */
        this.auth.local();
    }

}