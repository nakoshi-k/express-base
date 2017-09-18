import {helper,system} from "../core";
import  * as ejs from "ejs";
import  * as fs from "fs";

export class cell_helper extends helper{
    private _templates : {} = {};
    private _views: string;
    private _vars : {} = {};

    get templates() {
        return this._templates;
    }
    
    set templates (paths : {}) {
        this._templates = paths;
    }    
    
    public add ( name :string, path:string = "") {
        this._templates[name] = {path:path};
        if(path === ""){
            this._templates[name] = {path:name};
        }
    }
    
    private read : (name :string, path : string) => Promise<{path:string,status:boolean}> = (name:string , path:string)  => {
        return new Promise((resolve,reject) => {
            let filePath =  path;
            if( path.charAt(0) !== "/" && path.charAt(0) !== "\\" ){
                let ds = system.ds;
                filePath =  __dirname + ds + ".." + ds +"views" + ds + "tile" + ds + path + ".ejs";
                console.log(filePath);
            }
            fs.readFile( filePath , 'utf8',  (err, data) => {
                if(err){
                    resolve({ path : filePath ,status : false});
                    return;
                }
                this._templates[name]["entity"] = data;
                resolve({ path : filePath ,status : true});
            }); 
        })
    }


    public ready : () => Promise<{}> = () => {
        let all = [];
        let templates = this._templates;
        Object.keys(templates).forEach((key) => {
            all.push( this.read(key,templates[key].path) );
        })
        return Promise.all(all);
    }
    
    public render = (name = "" ,vars = {}) =>{
        if(name === ""){
            return "";
        }
        let templateEntity = this._templates[name].entity;
        if(typeof templateEntity === "undefined" ){
            return "";
        }

        return ejs.render( templateEntity , vars);
    }

}
