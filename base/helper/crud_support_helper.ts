import {helper} from "../core";
import  * as ejs from "ejs";
import  * as fs from "fs";

import {tag_helper,ejs_render_helper} from "../helper";
export class crud_support_helper extends helper{
    private tag:tag_helper; //tagHelperが入る
    private ejs_render:ejs_render_helper; //tagHelperが入る
    
    constructor(){
        super();
        this.tag = new tag_helper();
        this.ejs_render = new ejs_render_helper();
    }
    private _delete = "";
    
    public load = () => {
        return new Promise((resolve,reject) => {
            this._delete = "aaa";
            let filePath =  __dirname + "/../templates/delete.ejs";
            console.log(filePath);
            fs.readFile( filePath , 'utf8',  (err, data) => {
                console.log(data);
                if(err){
                    resolve(false);
                    return;
                }
                this._delete = data;
                resolve(true);
            }); 
        })
    }
    public delete = (title :string ,
                   options = { path : "example" , id : "id" , csrf : "csrf" , redirect : "redirect" } ,
                   linkOptions = { class : "button outline" }) => {
        var node_uuid = require('node-uuid');
        let uuid = node_uuid.v4().split("-").join("");
        let delFunc = "del_" + uuid + "()";
        let endPoint = options.path.replace("#" , String(options.id));
        return this.tag.wrap("a","delete" ,{ href : "#" , "onClick" : delFunc , class : linkOptions.class}) + ejs.render( this._delete , {id:options.id,
             delFunc : delFunc ,
             endPoint:endPoint ,
             token : options.csrf ,
             redirect : options.redirect
            } );
    }
      
}
