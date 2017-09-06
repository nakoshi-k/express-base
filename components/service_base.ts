
import * as express from "express";
import * as sequelize from "sequelize";
import {config} from "./common";
export class service_base{
    public models:sequelize.ModelsHashInterface;    
    public model:sequelize.Model<any,any>;    
    
    constructor (name:string) {
        let models = require('../models');
        this.models = models;
        this.model = models[name];
    }

    public pagination = ( query : sequelize.FindOptions<any>) => {
        let pagination = new Promise((resolve,reject) => {
            this.model.findAndCountAll(query)
            .then((res:{rows : any, count :number}) => {
                let pagination :any = { pagination : {totalPage:0,currentPage:1}};
                pagination.pagination.query = query;
                let offset :number = ( query.offset ) ? query.offset : 0;
                let limit = ( query.limit ) ? query.limit: 0;
                if(limit > 0){
                    pagination.pagination.total = Math.ceil(res.count / limit);
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