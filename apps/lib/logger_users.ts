import * as fs from "fs"
import * as path from "path"
import {logger as logger_module} from "./logger"
let logger = new logger_module();

export class logger_users{

    public user_log_path = (user_id :string) => {
        return path.resolve([ logger.dir , "users" ].join(path.sep) + path.sep + user_id + ".log");
    }

    public access_log = (user_id : string , action : string ) => {
        let file_path  = this.user_log_path(user_id);
        file_path = path.resolve(file_path);
        let content = {
            action : action,
            user_id : user_id
        }
        return logger.ready(file_path).then( r => logger.write(file_path,content) ).catch( e => {
            console.log(e);
        })
    }

    public read_file : (path) => Promise<string> = (path : string) =>{
        const read_file = (resolve,reject) => {
            fs.readFile(path , "utf-8" ,(err,text) => {
                if(err){
                    reject(err)
                }
                resolve(text)
            })
        }
        return new Promise(read_file);
    }

    public users_log( user_id : string ){
        let file_path  = this.user_log_path(user_id);
        const users_log = (resolve,reject) => {
            this.read_file(file_path).then(text => {
                let add_blanket = "[" + text.replace("," , "") + "]";
                let log_json = JSON.parse(add_blanket);
                resolve( log_json )
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(users_log)
    }

    public get_user_log = (user_id : string , action : string)  => {
        const get_user_log = (resolve,reject) =>{
            this.users_log(user_id).then((r:{[prop:string] : string}[]) => {
                let result = r.filter( function(item, index){
                    return item.action === action
                })
                resolve(result);
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(get_user_log);
    }

}