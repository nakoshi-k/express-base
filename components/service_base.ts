
import * as express from "express";
import * as sequelize from "sequelize";
import {config} from "../common";
import {search} from "./search";
import {pagination} from "./pagination";

export abstract class service_base{
    public models:sequelize.ModelsHashInterface;    
    public model:sequelize.Model<any,any>;    

    constructor (name:string) {
        let models = require('../models');
        this.models = models;
        this.model = models[name];
    }
    

    public search = (query = {}) => {
        return new search(query);
    }
    


    public pagination = (model:sequelize.Model<any,any> = this.model) =>{
        return new pagination(model);
    }


}