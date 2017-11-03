import {search} from "./lib/search";
import {pagination as pagination_mod} from "./lib/pagination";
import {validation_error} from "./lib/validation";
import {ModelsHashInterface,Model,WhereLogic,ValidationError,Instance,InstanceSetOptions,FindOptions} from "sequelize";
import  * as models from "../models";
import {missing_entity} from "./errors/errors"
import * as inflection from "inflection";

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


    public get_entities = (where , includes) => {
        const eintities = (resolve,reject) => {
            let conditions : FindOptions<{}> = {
                where : where 
            }
            if(includes){
                conditions.include = this.create_association(includes)
            }
            this.model.findAll( conditions ).then((result) => {
                if(!result){
                    reject( new missing_entity("no result") )
                    return
                }
                resolve(result)
            }).catch((err) => {
                reject(err)
            })  
        }
        return new Promise(eintities)
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
            console.log(conditions)
            this.model.findOne( conditions ).then((result) => {
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


    public new_entity : (data , includes? : object) => Instance<InstanceSetOptions>  = (data,includes?) => {
        return this.model.build(data ,{include:this.create_association(includes)})
    }
    
    public tranAsync = async ( process : () => Promise<any>[] ) =>{
        let result = [];
        for(let i = 0 ; i < process.length  ;i++){
            result[i] = await process[i]
        }
        return result;
    }

    public transaction = (process: any) => {

       const transaction = (resolve,reject) => {
         this.models.sequelize['transaction']().then(transaction => {
            this.tranAsync( process ).then(r => {
                transaction.commit()
                resolve(r)
            }
            ).catch(e => {
                transaction.rollback()
                reject(e)
            })
          })
        }
       return new Promise(transaction);
    }

    public save_entity : (newData:{[prop:string] : any } , includes?:object ) => Promise<any> = (newData ,includes) => {
        const save_entity = (resolve,reject) => {
            this.model.create(newData , { include : this.create_association(includes) }).then(r => {
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(save_entity);
    }

    public includes_filter = (includes,entity :  Instance<InstanceSetOptions> ) => {
        let check = entity.toJSON();
        let asso = Object.keys(check).filter((v,index) => {
            if( !check[v] ){
                return false
            }
            if(typeof check[v] === "string"){
                return false
            }
            return Object.keys(check[v]).length > 0
        })
        let exist_includes = asso.filter((v,index) => {
            let k = inflection.pluralize( inflection.underscore(v) )
            if(includes.indexOf(k) - 1){
                return true
            }
        })
        return exist_includes; 
    }

    public entity_merge = (entity,newData) => {
        for ( let k in newData ){
            if(typeof newData[k] === "string"){
                entity[k] = newData[k];
                continue
            }
            //for hasOne
            this.entity_merge(entity[k],newData[k])
            //for hasMany
        }
        return entity;
    }
    public save_association = (entity,name) => {
        const sa = (resolve,reject) => {
            entity[name].save(r => {
                resolve(r)
            }).catch( e => {
                for( let i = 0; i < e.errors.length ; i++ ){
                    e.errors[i].path = `${name}.${e.errors[i].path}`
                }
                reject(e)
            } )
        }
        return new Promise(sa);
    }
    public update_entity : (id:string,newData :{}, includes?:object ) => Promise<any> = (id , newData , includes )=>{
        
        const update = (resolve,reject) => {
            this.get_entity(id,includes).then(entity => {
                this.entity_merge(entity,newData)
                console.log("189")
                let process = []
                let associations = this.includes_filter(includes,entity);
                process.push(entity.save())
                associations.forEach( (v) => {
                    process.push( this.save_association(entity , v) )
                })
                this.transaction(process).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            }).catch(e => {
                reject(e)
            })
        }
       
        return new Promise(update)
    }

    public delete_entity : (id:string) => Promise<any> = async (id) => {
        const entity = await this.get_entity(id);
        return await entity.destroy()
    }

    public validationError = (error:ValidationError) =>{
        return new validation_error(error);
    }


    public key_value_select = ( list_option?:list_option ) => {
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
        return {key_field : key_field , value_field : value_field}
    }

    public get_list : (list_option?:list_option) => Promise<{[prop:string] : string}> = (list_option = {} ) => {
        
        let kv = this.key_value_select(list_option)
        let options = {
            attributes : [ kv.value_field , kv.key_field ]
        }

        if(list_option.where){
           options["where"] = list_option.where
         }

        const get_list = (resolve,reject) => {
            this.model.findAll(options)
            .then((result : Instance<{id:string}>[]) => {
                let list = [];
                result.forEach((v ,idx) => {
                   list.push( {
                       text : v.getDataValue( kv.key_field ) ,
                       value : v.getDataValue( kv.value_field )
                    } )
                })
                resolve(list)
            }).catch(e => {
                reject(e)
            })
        }
        return new Promise(get_list)
    }


}