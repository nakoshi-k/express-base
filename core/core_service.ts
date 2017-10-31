import {search} from "./lib/search";
import {pagination as pagination_mod} from "./lib/pagination";
import {validation_error} from "./lib/validation";
import {ModelsHashInterface,Model,WhereLogic,ValidationError , Instance , InstanceSetOptions} from "sequelize";
import  * as models from "../models";
import {missing_entity} from "./errors/errors"
export abstract class core_service{

    public models:ModelsHashInterface;    
    public model:Model<any,any>;    
    public name:string

    constructor (name:string) {
        this.name = name;
        this.models = models;
        this.model = models[name];
    }
    
    public search = (query = {}) => {
        return new search(query);
    }
    

    abstract conditions : (req) => { where : WhereLogic,limit:number,offset:number }

    public pagination = ( req, res ) => {
        let page = new pagination_mod(this.model);
        let conditions = this.conditions( req )
        
        const pagination = (resolve,reject) => {
            page.find(conditions,req.query).then( (r : {rows:any,count:number,pagination:any}) => {
                let data :{ [prop : string] :any, } = {}
                data[this.name] = r.rows;
                data.count = r.count;
                data.page = r.pagination;
                res.locals["data"] = data;
                resolve(data)
            }).catch(e => {
                res.locals["data"] = {}
                res.locals["data"][this.name] = []
                res.locals["data"]["page"] = {}
                reject(e)
            })
        }
        return new Promise(pagination);
    }


    public get_entity : (id:string) => Promise<Instance<InstanceSetOptions>> = (id) => {
        const entity = (resolve,reject) => {
            this.model.findById( id ).then((result) => {
                if(!result){
                    reject( new missing_entity("no result") )
                    return
                }
                resolve(result)
            }).catch((err) => {
                reject(err)
            })  
        }
        return new Promise(entity)
    }


    public new_entity : (data) => Instance<InstanceSetOptions>  = (data) => {
        return this.model.build(data)
    }

    public save_entity : (newData:{[prop:string] : string }) => Promise<any> = (newData) => {
        let entity = this.new_entity(newData)
        const save_entity = (resolve,reject) => {
            entity.save().then( (result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        }
        return new Promise(save_entity);
    }

    public update_entity : (id:string,newData :{}) => Promise<any> = async (id , newData)=>{
        const entity = await this.get_entity(id);
        return await entity.update(newData)
    }

    public validationError = (error:ValidationError) =>{
        return new validation_error(error);
    }

}