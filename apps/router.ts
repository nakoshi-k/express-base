import { router as core_router} from "../base/core";
import { system } from "../base/core";
import * as helpers  from "../base/helper";
export class router extends core_router{
    public name = "router";
    public parent = {};
    constructor (){
        super();
        this.views = {
            common : __dirname + system.ds + "views",
            typical: __dirname 
        }
        let crud = new helpers.crud();
        let path = [__dirname,"views","crud","delete.ejs"].join(system.ds);
        crud.deleteTemplate = path;
        this.helper("crud" ,crud );
    }

}