
import * as express from "express";
import * as sequelize from "sequelize";
import {system} from "../core";
import {search} from "./search";
import {pagination} from "./pagination";
import {validation_error} from "./validation";
import  * as models from "../../models";

export abstract class service{
    public models:sequelize.ModelsHashInterface;    
    public model:sequelize.Model<any,any>;    
    public name:string
    constructor (name:string) {
        this.name = name;
        this.models = models;
        this.model = models[name];
    }
    
    public search = (query = {}) => {
        return new search(query);
    }
    
    public pagination = (model:sequelize.Model<any,any> = this.model) =>{
        return new pagination(model);
    }

   abstract conditions : (req) => { where : sequelize.WhereLogic,limit:number,offset:number }

    public page = ( req, res ) => {
        let pagination = this.pagination();
        let conditions = this.conditions( req )
        const page = (resolve,reject) => {
            pagination.find(conditions,req.query).then( (r : {rows:any,count:number,pagination:any}) => {
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
        return new Promise(page);
    }

    public validationError = (error:sequelize.ValidationError) =>{
        return new validation_error(error);
    }

}