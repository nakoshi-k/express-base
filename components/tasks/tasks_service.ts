import {service_base} from "../service_base";
import * as sequelize from "sequelize";
export class tasks_service extends service_base{
   
    constructor(name:string){
        super(name);
    }

    public whereBuild = (query) :sequelize.WhereLogic=>{
        let where = this.search(query);
        return where.build;
    }

}

