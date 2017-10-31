import {createOptionsInterFace,createOptions} from "../interfaces/interface"
import {build_query} from "../../core/lib/build_query"
import {client_fetch} from "./client_fetch"
import route_parse from "../utilities/route_parse"
import {resource} from "./resource"
let client = new client_fetch()

export class internal_crud extends resource{
   
    private endPoint = ""
    private feeds:any
    private resource:any

    constructor( options ){
        super()
        this.endPoint = options.endPoint
        this.resource = options.resource
        this.feeds = options.feeds
    }
    
    private client = (url :string ,options :any ) =>{
        return client.fetch(url,options)
    }

    public paginate = (route) => {
        let bq = new build_query()
        let URI = `${this.endPoint}/${route_parse.parse(route)}${bq.http(route.query)}`
        if(this.is_server()){
            let service = this.feeds.service(this.resource);
            return service.pagination(route)
        }
        return this.client(URI ,{})
    }

    public entity = (route) => {
        let id = route.params.id
        let URI = `${this.endPoint}/${id}`
        if(this.is_server()){
            let service = this.feeds.service(this.resource);
            return service.get_entity(route.params.id)
        }
        return this.client(URI ,{})
    }

    public insert = (entity,token:string) => {
        entity = JSON.stringify(entity)
        let URI = this.endPoint
        let insert = (resolve,reject) => {
            this.client( URI , {
                body : entity,
                method : "post",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(insert)
    }

    public update = (entity,token:string) => {
        let URI = this.endPoint + "/" + entity.id
        entity = JSON.stringify(entity)
        let insert = (resolve,reject) => {
            this.client( URI , {
                body : entity,
                method : "put",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(insert)
    }

    public delete = (id , token ) => {
        let URI = this.endPoint + "/" + id
        let del = (resolve,reject) => {
            this.client( URI , {
                method : "delete",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve("api delete ok")
            }).catch(e => {
                reject("api delete error")
            })
        }
        return new Promise(del)
    }    

    public list = () => {
        let URI = `${this.endPoint}/list`
        if(this.is_server()){
            let service = this.feeds.service(this.resource);
            return service.get_list()
        }
        return this.client(URI ,{})
    }

}

