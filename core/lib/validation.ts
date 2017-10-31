import {ValidationError} from "sequelize";
export class validation_error{
    constructor(err : ValidationError){
        let validationError = {};
        let errors = err.errors;
        for(let key in errors){
            let name = errors[key].path;
            let type = errors[key].type;
            let message = errors[key].message;
            if(typeof validationError[name] === "undefined"){
                validationError[name] = [];
            }
            let v = {type : type , message : message};
            validationError[name].push(v);
        }
        return validationError;
    }

}