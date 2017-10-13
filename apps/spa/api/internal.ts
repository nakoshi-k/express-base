import {createOptionsInterFace,createOptions} from "../interface/interface";
import {build_query} from "../../../base/sideless/build_query";
import {app_error,input_error,response_error} from "../../../base/core";

export class internal{
    
    private options = {
        credentials : 'same-origin',
        method: "get",
        headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json'
        }
    }
    private endPoint = "";
    private host = "";
    private request:Request;

    constructor( options ){
        this.endPoint = options.endPoint;
        this.host = options.host;
        this.request = options.request;
    }

    private client = (url :string ,options : {} ) =>{
        let client = (resolve,reject) => {
            options = Object.assign(this.options,options);
            fetch( url , options )
            .then((response) => {
                if(response.status !== 201){ 
                    reject(response.status);
                    throw Error;
                };
                return response.json();
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
                throw Error;
            });
        }
        return new Promise(client);
    }
    
    private server = (url : string ,options = {}) =>{
        let req : any = this.request;
        let srvOptions = Object.assign(this.options,options);
        let server = (resolve,reject) => {
            let options = {
                url : `${this.host}${url}`,
                method: srvOptions.method,
                headers: srvOptions.headers
            }
            req(options, (error, response, body) => {
                if(error){
                    reject(true);
                    throw Error;
                }
                resolve( JSON.parse(body) );
            })
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
            return this.server(URI,{});
        }
        return this.client(URI ,{});
    }

    public entity = (route) => {
        let id = route.params.id;
        let URI = `${this.endPoint}/${id}`;
        if(typeof window === "undefined"){
            return this.server(URI,{});
        }
        return this.client(URI ,{});
    }

    public insert = () => {

    }

    public delete = () => {

    }    

}

