
import  * as models from "../../models";
import {pagination , validation_error ,search } from "../../base/core";
import * as sequelize from "sequelize";

export class feeds{

    constructor(){

    }

    get models(){
        return models;
    }

    model = (name:string) =>{
        return this.models[name];
    }

    private _service = {}

    service = (name : string) =>{
        return this._service[name];
    }
    
    public search = (query = {}) => {
        return new search(query);
    }
    
    public pagination = (model:string) =>{
        return new pagination( this.models[model] );
    }

    public validationError = (error:sequelize.ValidationError) =>{
        return new validation_error(error);
    }

}