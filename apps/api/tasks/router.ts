import * as path from "path"
import {router as apps_router,routing_map} from "../../apps_router"
import ee from "../../../core/interfaces/express_extends"
import {service} from "./service"

export const mapping :  { [propName: string]: routing_map } = {
    idx : { method : "get", route : "/", middleware : "search" , pre : null } ,
    page: { method : "get", route : "/page/:page", middleware : "search" , pre : null } ,
    entity : { method : "get", route : "/:id", middleware : "entity" , pre : null} ,
    insert : { method : "post", route : "/", middleware : "insert" , pre : null} ,
    update : { method : "put", route : "/:id", middleware: "update" , pre: null } ,
    delete : { method : "delete", route : "/:id", middleware : "delete" ,pre : null } 
}

export class router extends apps_router {
    public name = "tasks"
    public service:service


    protected _mapping = () => {
        return mapping 
    }
    

    constructor(){
        super();
        this.service = new service(this.name);
    }


    private search = (req : ee.request ,res: ee.response, next : ee.next ) => {
        let rend = this.renderer.create(res);
        this.service.pagination(req,res).then( (result : {rows : any, count :number,pagination:any}) => {
            rend.status(201)
            rend.json(rend.toJSON())
        }).catch((error) => {
            let data = {}; 
            data[this.entities_name] = {}
            data["page"] = {}
            rend.status(400)
            rend.json(data)
        })
    }   
   
    private entity = (req:ee.request,res:ee.response,next:ee.next) => {
        let rend = this.renderer.create(res);
        this.service.get_entity( req.params.id ).then((r) => {
            rend.status(201)
            rend.json(r)
        }).catch((err) => {
            let data = {}
            data[this.entities_name] = {}
            rend.status(401)
            rend.json(data)
        })        
    }
   
    private delete = (req:ee.request,res:ee.response) => {
        let rend = this.renderer.create(res)
        this.service.delete_entity( req.params.id ).then( r => {
            rend.status(204)
            rend.json( {} )
        }).catch(err => {
            console.log(err)
            rend.status(500)
            rend.json({})
        })
    }

    private insert = (req: ee.request,res:ee.response,next:ee.next) => {
        let rend = this.renderer.create(res)
        this.service.save_entity(req.body).then(r => {
            rend.status(201)
            rend.json(r.toJSON())
        }).catch(err =>{
            rend.status(400)
            rend.json(this.service.validationError(err))
        })
    }

    private update = (req:ee.request,res:ee.response,next:ee.next) => {
        let rend = this.renderer.create(res)
        this.service.update_entity(req.params.id , req.body).then(r => {
            rend.status(201)
            rend.json(r.toJSON())
        }).catch(err => {
            rend.status(400)
            rend.json(this.service.validationError(err))
        })
    }

}
