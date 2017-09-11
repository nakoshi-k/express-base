import {service_base} from "../service_base";
import * as sequelize from "sequelize";
export class tasks_service extends service_base{
   
    constructor(name:string){
        super(name);
    }

    public conditionsBuild = (query) :sequelize.WhereLogic=>{
        let conditions = this.search(query);
        conditions.append("title",conditions.like("%{word}%"));
        return conditions.build();
    }

}

