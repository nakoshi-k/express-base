import {helper} from "../core";

import {tag,cell} from "../helper";
export class crud_helper extends helper{
    private tag:tag; //tagHelperが入る
    private cell:cell; //tagHelperが入る
    
    constructor(){
        super();
        this.tag = new tag();
        this.cell = new cell();
    }
    private _deleteTemplate = "delete";
    
    set deleteTemplate(path : string){
        this._deleteTemplate = path;
    }
    
    get deleteTemplate(){
        return this._deleteTemplate;
    }

    public loading = () => {
        this.cell.add("delete" ,this.deleteTemplate);
        return this.cell.ready();
    }

    public delete = (title :string ,
                     options = { path : "example" , id : "id" , csrf : "csrf" , redirect : "redirect" } ,
                     linkOptions = { class : "button outline" }) => {

        var node_uuid = require('node-uuid');
        let uuid = node_uuid.v4().split("-").join("");
        let delFunc = "del_" + uuid + "()";
        let endPoint = options.path.replace("#" , String(options.id));
        
        let vars =  {
                id:options.id,
                delFunc : delFunc ,
                endPoint:endPoint ,
                token : options.csrf ,
                redirect : options.redirect
            };
        let s = this.tag.wrap("a","delete" ,{ href : "#" , "onClick" : delFunc , class : linkOptions.class})
        return  s + this.cell.render( "delete" , vars );
    }
      
}
