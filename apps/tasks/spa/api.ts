import {createOptionsInterFace,createOptions} from "./Interface";
export class Internal{
    
    private options = {
        credentials : 'same-origin',
        method: "get",
        headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json'
        }
    }
    private name = "";
    private names  = "";
    private host = "";
    private request:Request;

    constructor( options : createOptionsInterFace = createOptions){
        this.name = options.entity;
        this.names = options.entities;
        this.host = options.host;
        this.request = options.request;
    }

    private client = (url :string ,options : {} ) =>{
        let client = (resolve,reject) => {
            options = Object.assign(this.options,options);
            fetch( url , options )
            .then((response) => {
                if(response.status === 201){ 
                    return  response.json();
                };
                throw Error;
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        }
        return new Promise(client);
    }
    
    private server = (url : string ,options = {}) =>{
        let req : any = this.request;
        let server = (resolve,reject) => {
            let options = {
                url : `${this.host}${url}`,
                method:this.options.method,
                headers:this.options.headers
            }
            req(options, (error, response, body) => {
                if(error){
                    reject(true);
                }
                resolve( JSON.parse(body) );
            })
        }
        return new Promise(server);
    }

    public entities = (query = {page : 1, search : ""}) => {
        let url = `/${this.names}/page/${query.page}${query.search}`;
        if(typeof window === "undefined"){
            return this.server(url,{});
        }
        return this.client(url ,{});
    }
    
}
