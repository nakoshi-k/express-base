import {core_service as core_service_class} from "../core_service"

export class service extends core_service_class{
    name = "users"
    constructor(name:string){
        super(name)
        this.name = name;
    }

    public conditions = (req) : { where : {} ,limit:number,offset:number } =>{
        let search = this.search()
        search.query = req.query
        search.limit = 10
        search.page = req.params.page
        search.append("id",search.like("%{word}%"))
        search.append("title",search.like("%{word}%"))
        search.append("priod",search.like("%{word}%"))
        search.append("created_at",search.like("%{word}%"))
        search.append("updated_at",search.like("%{word}%"))
        return search.build()
    }

}

describe('test_core_service', () =>  {
    const core_service = new service("users");
    
    it("save" , (done) => {
        let mock = { name : "gggggg" ,
            user_profile : {
                first_name : "first_name",
                last_name : "first_name"
            }    
        }
        core_service.save_entity(mock,["user_profiles"]).then(r => {
            console.log(r)
            done()
        }).catch(e => {
            console.log(e)
        })

    })

    it("get_list" , (done) => {
        core_service.get_list({
            where : {
                name : { "$like" : "ff%"}
            } }
        ).then(r => {
            done()
        }).catch(e => {
            done(e)
        })
    })

});