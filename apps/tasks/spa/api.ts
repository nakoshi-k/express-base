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
    private entity_name = "";
    private entities_name = "";
    private host = "";
    private request:Request;

    constructor( options : createOptionsInterFace = createOptions){
        this.entity_name = options.entity;
        this.entities_name = options.entities;
        this.host = options.host;
        this.request = options.server.request;
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
                }
                resolve( JSON.parse(body) );
            })
        }
        return new Promise(server);
    }

    public paginate = (query = {page : 1, search : ""}) => {
        let url = `/${this.entities_name}/page/${query.page}${query.search}`;
        if(typeof window === "undefined"){
            return this.server(url,{});
        }
        return this.client(url ,{});
    }

    public entity = (query = {page : 1, search : ""}) => {
        let url = `/${this.entity_name}/page/${query.page}${query.search}`;
        if(typeof window === "undefined"){
            return this.server(url,{});
        }
        return this.client(url ,{});
    }
    public insert = () => {

    }

    public delete = () => {

    }    

}

