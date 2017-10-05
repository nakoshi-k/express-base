import {service as app_service} from "../service";
import * as sequelize from "sequelize";
export class service extends app_service{
   
    constructor(name:string){
        super(name);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search();
        search.query = req.query;
        search.page = req.params.page;
        search.limit = 20;
        search.append("name",search.like("%{word}%"));
        return search.build();
    }


}

