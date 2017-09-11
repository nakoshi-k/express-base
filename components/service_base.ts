
import * as express from "express";
import * as sequelize from "sequelize";
import {config} from "../common";
import {search} from "./search";
export abstract class service_base{
    public models:sequelize.ModelsHashInterface;    
    public model:sequelize.Model<any,any>;    

    constructor (name:string) {
        let models = require('../models');
        this.models = models;
        this.model = models[name];
    }
    
    public search = (query) => {
        return new search(query);
    }  
    
    abstract conditionsBuild = (query):sequelize.WhereLogic => {
        let condition = this.search(query);
        return condition.build();
    }
    /*
     * 
     * $param query
     * $return recodeset and pagination
     */
    
     public pagination = ( findOptions : sequelize.FindOptions<any> , queryPrams = {}) => {
        let pagination = new Promise((resolve,reject) => {
            this.model.findAndCountAll(findOptions)
            .then((res:{rows : any, count :number}) => {
                let pagination :any = { pagination : {totalPage:0,currentPage:1}};
                
                pagination.pagination.queryPrams = queryPrams;

                let offset :number = ( findOptions.offset ) ? findOptions.offset : 0;
                let limit = ( findOptions.limit ) ? findOptions.limit: 0;
                
                if(limit > 0){
                    pagination.pagination.totalPage = Math.ceil(res.count / limit);
                    pagination.pagination.currentPage = offset + 1;
                }
                
                pagination = Object.assign(res,pagination);
                resolve(pagination);
            }).catch((e) => {
                console.log(e);
                reject(e);
            })
        });
        return pagination;
    }

}