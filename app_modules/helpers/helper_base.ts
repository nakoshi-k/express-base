import {app_error} from "../../core/app_error";

export class helper_base{

    protected load = (name:string) => {
        this[name] = require("./" + name + "_helper");
    } 

}