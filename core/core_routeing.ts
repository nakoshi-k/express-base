import ee from "./interfaces/express_extends"
import * as e from "express"
import * as inflection from "inflection";
import { renderer } from "./lib/renderer";
import {core_service} from "./core_service" 

export interface routing_map{
    method : string,
    route : string,
    middleware : string,
    pre? : string[]

}

export abstract class core_routing{
    protected name = "router"
    protected service:core_service;

    public renderer : renderer;
    
    constructor(){
        this.renderer = new renderer();
    }

    protected _mapping : () => { [propName: string]: routing_map };
    
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

    private _pre_middle_ware = {};


    private strip_object_key = (obj:object) =>{
        let ary = [];
        for(let k in obj){
            ary.push(obj[k]);
        }
        return ary;
    }
    
    public pre_mw = (md:string[] = [] ) => {
        
        if(!md){
            return this.strip_object_key(this._pre_middle_ware);
        }

        if(md.length === 0){
            return this.strip_object_key(this._pre_middle_ware);
        }

        let midware = [];
        md.forEach((name) => {
            midware.push( this[name] );
        })
        return midware;
    }
    
    public pre_mw_regist = (key :string ,mw : (req,res,next) => void ) => {
        this._pre_middle_ware[key] = mw;
    }
    
    map : (included?  : string[]) => e.Router = (included = []) => {
        let router = e.Router()
        let pre_mw = this.pre_mw
        let map = this._mapping();

        if(included.length === 0 ){
            included = Object.keys(map);
        }

        included.forEach((key) => {
            let m = map[key];
            router[ m.method ]( m.route , ...pre_mw( m.pre ) , this[m.middleware] );
        })

        return router;
    }

}