import {service as apps_service} from "../../apps_service"
import * as sequelize from "sequelize"
import {request,response,next} from "../../interfaces/express_extend"
export class service extends apps_service{
    name = "groups"
    constructor(name:string){
        super(name)
    }
     
    
    
    public list = (req : request) => {
        const list = (resolve,reject) => {

        }
        return new Promise(list)
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search()
        search.query = req.query
        search.limit = 10
        search.page = req.params.page
        search.append("id",search.like("%{word}%"))
        search.append("name",search.like("%{word}%"))
        search.append("created_at",search.like("%{word}%"))
        search.append("updated_at",search.like("%{word}%"))
        return search.build()
    }


}

