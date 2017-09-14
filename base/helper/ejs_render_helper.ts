import {helper} from "../core";
import  * as ejs from "ejs";
import {config} from "../core"
export class ejs_render_helper extends helper{
    private ejs:any;
    private _template: string;
    private _views: string;
    private _vars : {};
    
    set template(path:string){
        this._template = path;
    } 
    
    get template() {
        return this._template;
    }
    
    get vars() {
        return this._vars;
    }

    set vars (vars : {}){
        this._vars = vars;
    }
    
    get views() {
        return this._views;
    }

    set views (views : string){
        this._views = views;
    }
    
    constructor () {
        super();
        this.ejs = require("ejs");

        let views = [__dirname];
        views.push("..");
        views.push("templates");


        this.views = views.join(config.sep) + config.sep;
    }
    public rendering = () => {
        let template = this.views  + this.template + ".ejs";
        let vars = this.vars;
        let opt = {};
        let rendering = new Promise((resolve , reject) => {
            ejs.renderFile(template, vars, opt , (err, str) => {
               if(err){
                   reject(err);
                   return;
               }
               resolve(str);
            });
        });
        return rendering;
    } 
    
    public render = (path:string , vars : {} ) => {
        this.template = path;
        this.vars = vars;
        return ejs.render("<%= >");
    }

}
