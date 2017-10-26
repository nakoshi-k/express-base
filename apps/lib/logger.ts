import * as fs from "fs"
import * as path from "path"
import * as uuid from "uuid"
import * as moment from "moment"
import * as mkdirp from "mkdirp";

export class logger{

    get dir(){
        return [ __dirname , ".." , "logs" ].join(path.sep);
    }


    exist : (path :string ) => Promise<boolean> = (path : string) => {
        const exist = (resolve,reject) => {
            fs.access(path,(err) => {
                if(err){
                    resolve(false)
                    return
                }
                resolve(true)
            })
        }
        return new Promise(exist);
    }
    private mkdir : (file_path) => Promise<void> = (file_path:string) => {
        let dir_stack = file_path.split(path.sep);
        dir_stack.pop()
        const dir = dir_stack.join(path.sep) 

        let mkdir = (resolve,reject) => {
            mkdirp(dir , (err) => {
                if(err){
                    reject(err);
                    return
                }
                resolve(true);
            })
        }
        return new Promise(mkdir);
    }

    private create : (path:string) => Promise<boolean> = (path:string) => {
        const create = (resolve,reject) => {
            fs.writeFile(path, "" , function (err) {
                console.log(err);
                if (err) {
                    reject(err)
                    return 
                }
                resolve(true)
            });
        }
        return new Promise(create);
    }

    public ready : (path) => Promise<boolean> = async (path:string) => {
        const exist = await this.exist(path)
        if(!exist){
            await this.mkdir(path)
            await this.create(path)
        }
        return true;
    } 

    public write : (path,content) => Promise<boolean> = (path:string , content : {uuid : string ,date: string} ) => {
        const write = (resolve,reject) => {
            content.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ssZ")
            content.uuid = uuid.v4();
            const jsonString = JSON.stringify(content)
            const writeData = `, ${jsonString} \n` 

            fs.appendFile(path, writeData , (err) => {
                if(err){
                    reject(err);
                    return
                }
                resolve(true)
            })
            
        }
        return new Promise(write)
    }


} 