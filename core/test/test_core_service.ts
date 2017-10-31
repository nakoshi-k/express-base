import {core_service as core_service_class} from "../core_service"

export class service extends core_service_class{
    name = "tasks"
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
    const core_service = new service("tasks");
    
    it("get_list" , (done) => {
        core_service.get_list({
            where : {
                title : { "$like" : "ff%"}
            } }).then(r => {
            done()
        }).catch(e => {
            done(e)
        })
    })

});