
import  * as models from "../../models";
import {pagination , validation_error ,search } from "../../base/core";
import * as sequelize from "sequelize";
import {service as tasks_service } from "../api/tasks/service"
import {service as users_service } from "../api/users/service"

let service = {
    tasks : new tasks_service("tasks"),
    users : new users_service("users")
}

export class feeds{

    constructor(){

    }

    get models(){
        return models;
    }

    model = (name:string) =>{
        return this.models[name];
    }

    service = (name : string) =>{
        return service[name]
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