import {service} from "../service";
import * as sequelize from "sequelize";
export class users_service extends service{
   
    constructor(name:string){
        super(name);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search();
        search.query = req.query;
        search.page = req.params.page;
        search.limit = 10;
        search.append("name",search.like("%{word}%"));
        return search.build();
    }


}
