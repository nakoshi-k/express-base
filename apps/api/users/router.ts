import * as path from "path"
import {router as apps_router,routing_map} from "../../apps_router"
import ee from "../../../core/interfaces/express_extends"
import {service} from "./service"

export const mapping :  { [propName: string]: routing_map } = {
    idx : { method : "get", route : "/", middleware: "search" , pre : null } ,
    login : { method : "post", route : "/login", middleware: "login" , pre : null } ,
    logout : { method : "get", route : "/logout", middleware: "logout" , pre: null } ,
    auth : { method : "get", route : "/auth", middleware: "auth" , pre: null },
    page: { method : "get", route : "/page/:page", middleware: "search" , pre: null } ,
    entity : { method : "get", route : "/:id",middleware: "entity" , pre: null} ,
    insert : { method : "post", route : "/", middleware: "insert" , pre: null} ,
    update : { method : "put", route : "/:id", middleware: "update" ,pre: null } ,
    delete : { method : "delete", route : "/:id", middleware : "delete" , pre : null },
}

export class router extends apps_router {
    public name = "users"
    public service:service

    protected _mapping = () => {
        return mapping 
    }
    
    constructor(){
        super()
        this.service = new service(this.name)
    }

    private search = (req : ee.request,res: ee.response, next : ee.next) => {
        let rend = this.renderer.create(res);
        this.service.pagination(req,res).then( (result : {rows : any, count :number,pagination:any}) => {
            rend.status(201)
            rend.json(result)
        }).catch((error) => {
            let data = {} 
            data[this.entities_name] = {}
            data["page"] = {}
            rend.status(400)
            rend.json(data)
        })
    }
   
    private entity = (req:ee.request,res:ee.response,next:ee.next) => {
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
   
    private delete = (req:ee.request,res:ee.response) => {
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

    private insert = (req: ee.request,res:ee.response,next:ee.next) => {
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

    private update = (req:ee.request,res:ee.response,next:ee.next) => {
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
    
    public login = ( req:ee.request,res:ee.response,next:ee.next ) => {
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
    
    public logout = ( req:ee.request,res:ee.response,next:ee.next) => {
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

    public auth = (req:ee.request,res:ee.response,next:ee.next) => {
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
