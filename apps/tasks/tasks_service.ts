import {service_base} from "../../app_modules/components/service_base";
import * as sequelize from "sequelize";
export class tasks_service extends service_base{
   
    constructor(name:string){
        super(name);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search();
        search.query = req.query;
        search.page = req.params.page;
        search.limit = 10;
        search.append("title",search.like("%{word}%"));
        return search.build();
    }

}

