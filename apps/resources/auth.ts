import {createOptionsInterFace,createOptions} from "../interfaces/interface";
import {build_query} from "../../base/sideless/build_query";
import {app_error,input_error,response_error} from "../../base/core";
import {client_fetch} from "./client_fetch";
import route_parse from "../utilities/route_parse";

let client = new client_fetch();

export class auth{
    private end_point = "/api/users"
    private feeds:any;
    constructor(feeds?:any){
        if(feeds){
            this.feeds = feeds;
        }
    }

    login = (user : { account : string ,password : string } , token ) => {
        let login = (resolve,reject) => {
            let url = this.end_point + "/login";
            let opt = {
                body : JSON.stringify(user),
                method : "post",
                headers : {
                    "X-XSRF-Token" : token
                }
            }
            client.fetch(url,opt).then(r => {
                resolve(r)                
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(login);
    }

    user_client = () => {
        let user = (resolve,reject) => {
            let url = this.end_point + "/auth";
            
            client.fetch(url,{}).then(r => {
                resolve(r)                
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(user);
    }
    user_server = () => {
        let user = (resolve,reject) => {
            let url = this.end_point + "/auth";
            
            client.fetch(url,{}).then(r => {
                resolve(r)                
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(user);
    }
    user = () => {
        if(typeof window === "undefined"){
            return this.user_client();
        }
        return this.user_server()
    }

    logout = () => {
        let logout = (resolve,reject) => {
            let url = this.end_point + "/logout";
            client.fetch(url,{}).then(r => {
                resolve(r)                
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(logout);
    }
}
