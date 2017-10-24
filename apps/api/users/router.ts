import * as path from "path"
import {router as apps_router,routing_map,request,response,next} from "../../apps_router"
import {service} from "./service"
import {input_error} from "../../../base/core"


export class router extends apps_router {
    public name = "users"
    public service:service

    protected _mapping :  { [propName: string]: routing_map }= {
        idx : { type : "get", mount : "/", component : "search" , middle_ware : null } ,
        page: { type : "get", mount : "/page/:page", component : "search" , middle_ware : null } ,
        entity : { type : "get", mount : "/:id", component : "entity" , middle_ware : null} ,
        insert : { type : "post", mount : "/", component : "insert" , middle_ware : null} ,
        update : { type : "put", mount : "/:id", component : "update" , middle_ware : null } ,
        delete : { type : "delete", mount : "/:id", component : "delete" , middle_ware : null } 
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
        const passport = this.service.passport
        let rend = this.renderer.create(res)
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                rend.status(401)
                rend.json({})
                return 
            }
            if (!user) {
                rend.status(401)
                rend.json({})
                return
            }
            req.logIn(user, (err) => {
                if (err) {
                    res.status(401)
                    res.json({})
                    return
                }
                rend.status(201)
                rend.json(user);
            });
        })(req, res, next);
    }

    
    public logout = ( req:request,res:response,next:next) => {
        req.logOut();
        res.send(201)
    }



}
