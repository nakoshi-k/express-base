import {core_service as core_service_class} from "../core_service"
import * as assert from 'assert';
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
    let insert_id = ""

    it("save" , (done) => {
        let mock = { name : "save-test" ,
            user_profile : {
                first_name : "fiest",
                last_name : "last"
            }    
        }
        core_service.save_entity(mock,["user_profiles"]).then(r => {
            insert_id = r.id
            done()
        }).catch(e => {
            console.log(e)
            done(e)
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

    it("check_inc" , () => {
        let mock = { name : "gggggg" ,
            user_profile : {
                first_name : "first_name",
                last_name : "last_name"
            }    
        }
        let ins = core_service.new_entity(mock,["user_profiles"])
        let result = core_service.includes_filter( ["user_profile"] ,ins)
        assert.strictEqual(result.length,["user_profile"].length,"aaa")
    })
    
    it("update" ,(done) =>{
        let mock = { name : "update-test" ,
            user_profile : {
                first_name : "first_name-update",
                last_name : "first_name-update"
            }    
        }
        core_service.update_entity(insert_id,mock,["user_profiles"]).then(r => {
            done()
        }).catch(e => {
            console.log(e)
            done(e)
        })
    })

    it("delete" ,(done) =>{
        let mock = { name : "update-test" ,
            user_profile : {
                first_name : "first_name-update",
                last_name : "first_name-update"
            }    
        }
        core_service.delete_entity(insert_id,["user_profiles"]).then(r => {
            done()
        }).catch(e => {
            console.log(e)
            done(e)
        })
    })

});