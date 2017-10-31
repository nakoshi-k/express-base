
import  * as models from "../../models";
import { pagination } from "../../core/lib/pagination";
import { validation_error } from "../../core/lib/validation";
import { search} from "../../core/lib/search";
import * as sequelize from "sequelize";
import {service as tasks_service } from "../api/tasks/service"
import {service as users_service } from "../api/users/service"
import {service as groups_service} from "../api/users/service"
import ee from "../../core/interfaces/express_extends"

let service = {
    tasks : new tasks_service("tasks"),
    groups : new groups_service("groups"),
    users : new users_service("users")
}

export class feeds{

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
    
    public user = {}

    private setUser = (req:ee.request) => {
        if(req.user){
            this.user = Object.assign( {},  req.user.toJSON() )
        }
    }
    
    public init = (req : ee.request ,res:ee.response) => {
        this.setUser(req);
    }
    

}