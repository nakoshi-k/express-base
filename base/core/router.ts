import * as e from "express";
import * as service from "./service";
import { renderer ,routing_map} from "./renderer";
export { routing_map } from "./renderer";
import * as inflection from "inflection";
import {system,helper} from "../core";
export {system,helper} from "../core";

export abstract class router{
    protected name = "router"
    protected service:service.service;

    public renderer : renderer;
    
    constructor(){
        this.renderer = new renderer();
    }

    protected _mapping :  { [propName: string]: routing_map };
    
    get entity_name(){
        return inflection.singularize(this.name);
    }

    get entities_name(){
        return inflection.pluralize(this.name);
    }

    get models(){
        return this.service.models;
    }
    get model(){
        return this.service.model;
    }

    private _middle_ware = {};


    private strip_object_key = (obj:object) =>{
        let ary = [];
        for(let k in obj){
            ary.push(obj[k]);
        }
        return ary;
    }
    
    public middle_ware = (md:string[] = [] ) => {
        if(!md){
            return this.strip_object_key(this._middle_ware);
        }
        if(md.length === 0){
            return this.strip_object_key(this._middle_ware);
        }

        let midware = [];
        md.forEach((name) => {
            midware.push( this[name] );
        })
        return midware;
    }
    
    public mw_regist = (key :string ,mw : (req,res,next) => void ) => {
        this._middle_ware[key] = mw;
    }
    
    map : (included?  : string[]) => e.Router = (included = []) => {
        let router = e.Router();
        let middle_ware = this.middle_ware
        let map = this._mapping;
        if(included.length === 0 ){
            included = Object.keys(this._mapping);
        }

        included.forEach((key) => {
            let m = map[key];
            router[ m.type ]( m.mount , ...middle_ware( m.middle_ware ) , this[m.component] );
        })

        return router;
    }

}

