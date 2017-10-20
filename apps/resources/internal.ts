import {createOptionsInterFace,createOptions} from "../interfaces/interface";
import {build_query} from "../../base/sideless/build_query";
import {app_error,input_error,response_error} from "../../base/core";

export class internal{
    
    private _options = {
        credentials : 'same-origin',
        method: "get",
        headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json'
        }
    }
    get options(){
        return Object.create(this._options);
    }
    private endPoint = "";
    private host = "";
    private request:Request;
    private service:any;

    constructor( options ){
        this.endPoint = options.endPoint;
        this.host = options.host;
        this.request = options.request;
        this.service = options.service
    }
    
    private client = (url :string ,options :any ) =>{
        let base:any = this.options;
        if(options.headers){
            options.headers = Object.assign( base.headers, options.headers);
        }
        options = Object.assign(base,options);
        let client = (resolve,reject) => {
            fetch( url , options )
            .then((response) => {
                //deleted
                if( response.status === 204 ){
                    resolve(response.status);
                    return;
                }
                response.json().then(r => {
                    if(response.status < 200 || response.status > 300  ){
                        reject(r);
                        return;
                    }
                    resolve(r);
                });
            }).catch((err) => {
                reject(err);
            });
        }
        return new Promise(client);
    }


    
    private serverPagination = (route) => {
       let serverPagination = (resolve,reject) => {
            let pagination = this.service.pagination();
            let conditions = this.service.conditions( route );
            let entities = pagination.find( conditions ,route.query);
            let name = this.service.name;
            let data = {};
            entities.then( (result : {rows : any, count :number,pagination:any}) => {
                if(result.rows.length  === 0){
                    reject(false);
                };
                data[name] = result.rows;
                data["page"] = result.pagination;
                resolve(data);
            }).catch((error) => {
                data[name] = {};
                data["page"] = {};
                reject(error);
            })
        }
        return serverPagination;
    }

    private serverEntity = (route) => {
        let entity = this.service.model;
        let serverEntity = (resolve,reject) => {
            let model = this.service.model;
            let data = {};
            model.findById( route.params.id ).then((result) => {
                if(!result){
                    reject();
                    throw Error;
                }
                resolve(result);
            }).catch((err) => {
                reject(err);
            })  
        }
        return serverEntity;
   }     
    
    private server = ( type : string ,route) =>{
        let req : any = this.request;
        let server:any;
        if(type === "paginate"){
           server = this.serverPagination(route);
        }
        if(type === "entity"){
           server = this.serverEntity(route);
        }
        return new Promise(server);
    }

    public routeParse(route){
        let params = route.params;
        let paramsStr = "";
        for(let key in params){
            paramsStr = `${key}/${params[key]}`
        }
        return paramsStr;
    }

    public paginate = (route) => {
        let bq = new build_query();
        let URI = `${this.endPoint}/${this.routeParse(route)}${bq.http(route.query)}`;
        if(typeof window === "undefined"){
            return this.server("paginate",route);
        }
        return this.client(URI ,{});
    }

    public entity = (route) => {
        let id = route.params.id;
        let URI = `${this.endPoint}/${id}`;
        if(typeof window === "undefined"){
            return this.server( "entity" ,route);
        }
        return this.client(URI ,{});
    }

    public insert = (entity,mount:string,token:string) => {
        entity = JSON.stringify(entity);
        let URI = mount;
        let insert = (resolve,reject) => {
            this.client( URI , {
                body : entity,
                method : "post",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        }
        return new Promise(insert);
    }

    public update = (entity,mount:string,token:string) => {
        let URI = mount + "/" + entity.id;
        entity = JSON.stringify(entity);
        let insert = (resolve,reject) => {
            this.client( URI , {
                body : entity,
                method : "put",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        }
        return new Promise(insert);
    }

    public delete = (id , mount, token ) => {
        let URI = mount + "/" + id;
        let del = (resolve,reject) => {
            this.client( URI , {
                method : "delete",
                headers : {
                    'X-XSRF-Token': token
                }
            } ).then(r => {
                resolve("api delete ok");
            }).catch(e => {
                reject("api delete error");
            });
        }
        return new Promise(del);
    }    

}

