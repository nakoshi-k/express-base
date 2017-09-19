
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

    constructor (name:string) {
        this.models = models;
        this.model = models[name];
    }
    
    public search = (query = {}) => {
        return new search(query);
    }
    
    public pagination = (model:sequelize.Model<any,any> = this.model) =>{
        return new pagination(model);
    }

    public validationError = (error:sequelize.ValidationError) =>{
        return new validation_error(error);
    }

}