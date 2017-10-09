import {service as app_service} from "../service";
import * as sequelize from "sequelize";
export class service extends app_service{
   
    constructor(name:string){
        super(name);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search();
        search.query = req.query;
        search.limit = 5;
        search.page = req.params.page;
        search.append("title",search.like("%{word}%"));
        return search.build();
    }


}

