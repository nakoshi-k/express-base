import {search} from "./lib/search";
import {pagination as pagination_mod} from "./lib/pagination";
import {validation_error} from "./lib/validation";
import {ModelsHashInterface,Model,WhereLogic,ValidationError,Instance,InstanceSetOptions,FindOptions} from "sequelize";
import  * as models from "../models";
import {missing_entity} from "./errors/errors"

interface list_option{
    key_field? : string,
    value_field? : string,
    where? : {}
}

export abstract class core_service{

    public models:ModelsHashInterface;    
    public model:Model<any,any>;    
    public name:string
    public parent : any = {};

    constructor (name:string) {
        this.models = models;
        this.model = models[name];
        for( let k in this ){
            this.parent[k] = this[k]
        }
    }
    
    public search = (query = {}) => {
        return new search(query);
    }

    abstract conditions : (req) => { where : WhereLogic,limit:number,offset:number }

    public pagination  = ( req, res = {locals:{}} ) => {
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

    public create_association = (includes:object) => {
        let association = []
        for(let k in includes){
            association.push({model : this.models[ includes[k] ] })
        }
        return association
    }

    public get_entity : (id:string,includes?:object) => Promise<Instance<InstanceSetOptions>> = (id,includes = {}) => {
        const entity = (resolve,reject) => {
            let conditions : FindOptions<{}> = {
                where : {id : id}
            }
            if(includes){
                conditions.include = this.create_association(includes)
            }

            this.model.findOne( conditions ).then((result) => {
                if(!result){
                    reject( new missing_entity("no result") )
                    return
                }
                resolve(result)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })  
        }
        return new Promise(entity)
    }


    public new_entity : (data) => Instance<InstanceSetOptions>  = (data) => {
        return this.model.build(data)
    }

    public save_entity : (newData:{[prop:string] : string }) => Promise<any> = (newData) => {
        const save_entity = (resolve,reject) => {
            let entity = this.new_entity(newData)
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

    public delete_entity : (id:string) => Promise<any> = async (id) => {
        const entity = await this.get_entity(id);
        return await entity.destroy()
    }

    public validationError = (error:ValidationError) =>{
        return new validation_error(error);
    }


    public get_list : (list_option?:list_option) => Promise<{[prop:string] : string}> = (list_option = {} ) => {
        
        let key_field = ""
        let value_field = "id"

        if(list_option.value_field){
            value_field = list_option.value_field
        }
        
        if(list_option.key_field){
           key_field = list_option.key_field
        }
        if(!list_option.key_field){
            let fields = Object.keys(this.model["rawAttributes"])
            let candidate = ["name" , "title" , "id"].reverse()
            candidate.forEach((v,idx) => {
                if( fields.indexOf(v) > -1 ){
                    key_field = v
                    return;
                }
            })
        }
        let options = {
            attributes : [ value_field , key_field ]
        }

        if(list_option.where){
           options["where"] = list_option.where
         }

        const get_list = (resolve,reject) => {
            this.model.findAll(options)
            .then((result : Instance<{id:string}>[]) => {
                let list = [];
                result.forEach((v ,idx) => {
                   list.push( { text : v.getDataValue( key_field ) , value : v.getDataValue( value_field ) } )
                })
                resolve(list)
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(get_list)
    }


}