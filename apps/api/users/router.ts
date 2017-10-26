import * as path from "path"
import {router as apps_router,routing_map,request,response,next} from "../../apps_router"
import {service} from "./service"
import {input_error} from "../../../base/core"

export const mapping :  { [propName: string]: routing_map } = {
    idx : { type : "get", mount : "/", component : "search" , middle_ware : null } ,
    login : { type : "post", mount : "/login", component : "login" , middle_ware : null } ,
    logout : { type : "get", mount : "/logout", component : "logout" , middle_ware : null } ,
    auth : { type : "get", mount : "/auth", component : "auth" , middle_ware : null },
    page: { type : "get", mount : "/page/:page", component : "search" , middle_ware : null } ,
    entity : { type : "get", mount : "/:id", component : "entity" , middle_ware : null} ,
    insert : { type : "post", mount : "/", component : "insert" , middle_ware : null} ,
    update : { type : "put", mount : "/:id", component : "update" , middle_ware : null } ,
    delete : { type : "delete", mount : "/:id", component : "delete" , middle_ware : null },
}

export class router extends apps_router {
    public name = "users"
    public service:service

    get _mapping(){
        return mapping;
    }
    constructor(){
        super()
        this.service = new service(this.name)
    }

    private search = (req : request,res: response, next : next) => {
        let pagination = this.service.pagination()
        let conditions = this.service.conditions( req )
        let entities = pagination.find( conditions , req.query)
        let data = {}
        let rend = this.renderer.create(res);
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows
            data["page"] = result.pagination
            rend.status(201)
            rend.json(data)
        }).catch((error) => { 
            data[this.entities_name] = {}
            data["page"] = {}
            rend.status(400)
            rend.json(data)
        })
    }
   
    private entity = (req:request,res:response,next:next) => {
        let model = this.model
        let data = {}
        let rend = this.renderer.create(res);
        model.findById( req.params.id ).then((result) => {
            if(!result){
                throw Error
            }
            rend.status(201)
            rend.json(result)
        }).catch((err) => {
            data[this.entities_name] = {}
            rend.status(401)
            rend.json(data)
        })        
    }
   
    private delete = (req:request,res:response) => {
        let model = this.model
        let rend = this.renderer.create(res);
        model.findById( req.params.id ).then((result) => {
            if(result){
                result.destroy().then( () => {
                    rend.status(204)
                    rend.json( {} )
                }).catch(e => {
                   rend.status(500)
                   rend.json({})
                })
            }else{
                rend.status(500)
                rend.json({})
            }
        })
    }

    private insert = (req: request,res:response,next:next) => {
        let entity = this.model.build(req.body)
        let rend = this.renderer.create(res)
        entity.save().then( (result) => {
            rend.status(201)
            rend.json(entity.dataValues)
        }).catch((err) => {
            rend.status(400)
            rend.json(this.service.validationError(err))
        })
    }

    private update = (req:request,res:response,next:next) => {
        let model = this.model
        let rend = this.renderer.create(res)
        model.findById( req.params.id ).then((entity) => {
            entity.update(req.body).then( (result) => {
                rend.status(201)
                rend.json(result)
            }).catch((err) => {
                rend.status(400)
                rend.json(this.service.validationError(err))
            })
        }).catch((err) => {
            rend.status(400)
            rend.json(err)
        })
    }
    
    public login = ( req:request,res:response,next:next ) => {
        let login = this.service.auth.login(req,res,next)

        let rend = this.renderer.create(res)
        login.then(user => {
            rend.status(201)
            rend.json(user)
        }).catch(e => {
            rend.status(401)
            if(e === "password"){
                rend.json({"password" : [ {"message" : "invalid password"} ] })
                return
            }
            if(e === "account"){
                rend.json({"account" : [ { "message" : "invalid account"} ] })
                return
            }
            rend.status(500)
            rend.json({"internal" : [ e ] })
        })
        
    }
    
    public logout = ( req:request,res:response,next:next) => {
        let rend = this.renderer.create(res)
        let logout = this.service.auth.logout(req)
        
        logout.then(r => {
            rend.status(201)
            rend.json({"message" : "logout"})
        }).catch(e => {
            rend.status(401)
            rend.json({"message" : "logout failed"})
        })

    }

    public auth = (req:request,res:response,next:next) => {
        let rend = this.renderer.create(res)
        let auth_user = this.service.auth.user(req);

        auth_user.then(user => {
            rend.status(201)
            rend.json(user)
        }).catch(e => {
            rend.status(401)
            rend.json({})
        })
    }

}
