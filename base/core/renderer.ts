import {system,helper} from "../core";
import * as e from "express";

export interface middle_ware{
    request : e.Request,
    res : e.Response
    next : e.NextFunction
}

export interface routing_map{
    method : string,
    route : string,
    component : string,
    middle_ware? : string[]

}
export interface view_vars{
    title : string,
    csrf: string,
    hlp : { [prop : string] : object},
    [prop: string] : any
}

export class renderer{
    _name = "renderer"
    _response : e.Response
    
    set name(name :string){
        this.name = name;
    }
    
    get name(){
        return this._name;
    }

    _before = [ (res,self) => Promise.resolve() ];
    
    before_regist = ( before : (res,self) => Promise<void> ) => {
        this._before.push(before);
    }
    
    set_vars = (data = {}) => {
        let locals = this._response.locals;
        Object.assign(locals, data);
    }

    async_before = async (res) => {
        let asyncBefore = this._before
        for(let k in asyncBefore){
            await asyncBefore[k](res,this)
        }
        return;
    }

    protected _views = {
        common : "",
        typical : ""   
    }
    
    get views() {
        return this._views;
    }
    
    set views(paths:{common:string,typical:string}){
        this._views.common = paths.common;
        this._views.typical = paths.typical;
    }

    view_dir = (view : string ) => {
        let f = view.substring(0,1);
        let ds :string = system.ds;
        if(f !== "." && f !== ds ){
            let dir =  this.views.typical;
            this._response.app.set('views', dir);
            return view;
         }
         let sp = view.split(system.ds);
         let view_name = sp.pop();
         this._response.app.set('views', sp.join(system.ds));
         return view_name;
    }
    
    res_render = (view:string) => {
        let res = this._response;
        let resRender = (resolve,reject) => {
            res.render(view,(err,html) => {
                if(!err){
                    res.send(html);
                    return;
                }
                res.app.set('views', this.views.common );
                res.status = err.status;
                if(res.app.get('env') === 'development') {
                    res.render("error", { code : "" ,"message" : err.message , "error" :err });
                    return;
                }
                res.render("error", { "code" : "" , "message" : err.message , "error" : {} });
            })
        }
        return new Promise(resRender);
    }

    render = (view) => {
        let res = this._response;
        let v = this.view_dir(view)
        let before = this.async_before(res);
        before.then( r => this.res_render(v) ).catch(e => {
            res.status(500);
            res.send({error : e});
        })        
    }
    
    json = (values = {} ) => {
        let res = this._response;
        let before = this.async_before(res);
        before.then( r => {
            res.json(values);
        } ).catch(e => {
            res.status(500);
            res.send({error : e});
        })
    }

    status = (state : number) => {
        let res = this._response;
        res.status(state);
    }
    
    create = (res) => {
        this._response = res;
        return Object.assign({},this);
    }
    
    _to_json_field = "data";

    toJSON = () => {
        return this._response.locals[this._to_json_field];
    }

}