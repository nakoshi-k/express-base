import {service as apps_service} from "../../apps_service"
import {WhereLogic} from "sequelize"


export class service extends apps_service{
    name = "users"

    constructor(name:string){
        super(name)
    }

    public get_entity = (id : string,includes = {}) => {
        return this.parent.get_entity(id,["groups","user_profiles"])
    }        

    public pagination  = ( req, res = {locals:{}} ) => {
        return this.parent.pagination(req,res)
    }

    public save_entity = (newData) => {
        return this.parent.save_entity(newData)
    }

    public update_entity = (id , newData)=>{
        return this.parent.update_entity(id,newData) 
    }

    public delete_entity = (id) => {
        return this.parent.delete_entity(id);
    }
    
    public conditions = (req) : { where : WhereLogic,limit:number,offset:number } =>{
        let search = this.search()
        search.query = req.query
        search.limit = 10
        search.page = req.params.page
        search.append("id",search.like("%{word}%"))
        search.append("name",search.like("%{word}%"))
        search.append("mail",search.like("%{word}%"))
        search.append("group_id",search.like("%{word}%"))
        search.append("access_token",search.like("%{word}%"))
        search.append("refresh_token",search.like("%{word}%"))
        search.append("new_password",search.like("%{word}%"))
        search.append("confirm_password",search.like("%{word}%"))
        search.append("created_at",search.like("%{word}%"))
        search.append("updated_at",search.like("%{word}%"))
        return search.build()
    }

}

