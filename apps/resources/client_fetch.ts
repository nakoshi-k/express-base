import {createOptionsInterFace,createOptions} from "../interfaces/interface";
import {build_query} from "../../base/sideless/build_query";
import {app_error,input_error,response_error} from "../../base/core";

export class client_fetch{
    
    private _options = {
        credentials : 'same-origin',
        method: "get",
        headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json'
        }
    }
    constructor(){

    }
    get options(){
        return Object.create(this._options);
    }
   
    public fetch = (url :string ,options :any ) =>{
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

}

