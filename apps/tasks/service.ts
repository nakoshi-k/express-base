import {service as app_service} from "../service";
import * as sequelize from "sequelize";
export class service extends app_service{
    name = "tasks";
    constructor(name:string){
        super(name);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search();
        search.query = req.query;
        search.limit = 10;
        search.page = req.params.page;
        search.append("id",search.like("%{word}%"));
        search.append("title",search.like("%{word}%"));
        search.append("priod",search.like("%{word}%"));
        search.append("created_at",search.like("%{word}%"));
        search.append("updated_at",search.like("%{word}%"));
        return search.build();
    }


}

