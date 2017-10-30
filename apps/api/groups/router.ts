import * as path from "path"
import {router as apps_router,routing_map} from "../../apps_router"
import {request,response,next} from "../../interfaces/express_extend"
import {service} from "./service"
import {input_error} from "../../../base/core"

export const mapping :  { [propName: string]: routing_map } = {
    idx : { method : "get", route : "/", component : "search" , middle_ware : null } ,
    page: { method : "get", route : "/page/:page", component : "search" , middle_ware : null } ,
    entity : { method : "get", route : "/:id", component : "entity" , middle_ware : null} ,
    insert : { method : "post", route : "/", component : "insert" , middle_ware : null} ,
    update : { method : "put", route : "/:id", component : "update" , middle_ware : null } ,
    delete : { method : "delete", route : "/:id", component : "delete" , middle_ware : null } 
}

export class router extends apps_router {
    public name = "groups"
    public service:service

    protected _mapping = () => {
        return mapping 
    }

    constructor(){
        super();
        this.service = new service(this.name)
    }

    private search = (req : request ,res: response, next : next ) => {
        let rend = this.renderer.create(res);
        this.service.page(req,res).then( (result : {rows : any, count :number,pagination:any}) => {
            rend.status(201)
            rend.json(rend.toJSON())
        }).catch((error) => { 
            rend.status(400)
            rend.json(rend.toJSON())
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
        let rend = this.renderer.create(res)
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

}
