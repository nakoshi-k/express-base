import {createOptionsInterFace,createOptions} from "../interfaces/interface"
import {build_query} from "../../core/lib/build_query"
import {client_fetch} from "./client_fetch"
import route_parse from "../utilities/route_parse"
import {feeds} from "./feeds"
import {resource} from "./resource"

let client = new client_fetch()

export class auth extends resource{
    private end_point = "/api/users"
    public feeds:feeds
    constructor(options?:any){
        super()
        this.feeds = options.feeds
    }

    login = (user : { account : string ,password : string } , token ) => {
        let login = (resolve,reject) => {
            let url = this.end_point + "/login"
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
        return new Promise(login)
    }

    user_client = () => {
        let user = (resolve,reject) => {
            let url = this.end_point + "/auth"
            
            client.fetch(url,{}).then(r => {
                resolve(r)                
            }).catch(e => {
                reject("login user undefined")
            })
        }
        return new Promise(user)
    }

    user_server = () => {
        let user_server= (resolve,reject) => {
            if(this.feeds.user["id"]){
                resolve(this.feeds.user)
                return
            }
           reject("login user undefined")
        }
        return new Promise(user_server)
    }

    user = () => {
        if( this.is_server() ){
            return this.user_server()
        }
        return this.user_client()
    }

    logout = () => {
        let logout = (resolve,reject) => {
            let url = this.end_point + "/logout"
            client.fetch(url,{}).then(r => {
                resolve(r)                
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(logout)
    }
}
