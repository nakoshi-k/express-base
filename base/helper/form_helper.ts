import {helper} from "../core";
import {tag} from "../helper";
export class form_helper extends helper{
    private bindData : any = {};
    private tag:tag; //tagHelperが入る

    constructor(){
        super();
        this.tag = new tag();
        this.bindData = {csrf:""};
    }

    set bind(bindData : {}){
        this.bindData = Object.assign( this.bindData ,bindData);
    }

    get bind(){
        return this.bindData;
    }
    
    private unBind = () =>{
        this.bindData = {};
    }

    private initAttr = ( name : string , attr:{} = {} ) => {
        attr["name"] = name;

        if(attr["value"]){
            return attr;
        }

        if( name in this.bindData){
            attr["value"] = this.bindData[name];
            return attr;        
        }
        return attr;
    }

    csrf = (token : string) : string => {
        if(token === ""){
            return "";
        }
        return this.tag.create( "input" , { name : "_csrf" , value : token , type : "hidden"});
    }
    
    action = (action:string) => {
        action = action.replace(":id" , this.bindData.id);
        return action;
    }

    start = (name:string , bindData = {},attr = {method : "post" , action : ""}) => {
        this.bind = bindData;
        attr["name"] = name;
        
        let method = "";
        if(attr.method !== "post" && attr.method !== "get"){
            method = this.method(attr.method);
            attr.method = "post";
        }
        attr.action = this.action(attr.action);

        let form = this.tag.create("form",attr);
        form += method;
        form += this.csrf(this.bindData.csrf) ;
        return form;
    }
    
    end = () => {
        this.unBind();
        return this.tag.create("/form");
    }  

    private validationError = (name :string ,element:string) => {
        
        if(!this.bind["errors"]){
            return this.tag.wrap("div" , element , { class : "input" } );
        }
        
        if(!this.bind["errors"][name]){
            return this.tag.wrap("div" , element , { class : "input" } );
        }

        let vdt = this.bind["errors"][name];
        for(let i = 0 ;i < vdt.length ; i++){
            element += this.tag.wrap( "div" , vdt[i]["message"] , { "class" :"error" , "data-validation" : vdt[i]["type"] } )
        }

        return this.tag.wrap("div" , element , { class : "input error" } );
    }
    private postProcess = ( name:string , element : string) => {
        
        element = this.validationError( name ,element );

        return element;
    }

    submit = ( title : string , attr:{} = { class : "button primary" }) => {
        return this.tag.wrap("button", title , attr );
    }

    input = ( name:string , attr = {}) => {
        if(!attr["type"]){
            attr["type"] = "text";
        }
        attr = this.initAttr(name,attr)
        if( attr["type"] === "hidden" ){
            return this.tag.create("input",attr);
        }
        return this.postProcess( name , this.tag.create("input",attr) );
    }

    textarea = ( name:string , attr = {} ) => {
        attr = this.initAttr(name,attr);
        let innerContent = attr["value"];
        attr = this.removeAttr("value",attr);
        return this.postProcess( name, this.tag.wrap( "textarea" , innerContent , attr));
    }

    removeAttr = (property : string,attr : {} = {}) : {} => {
        if(attr.hasOwnProperty(property)){
            delete attr[property];
        }       
        return attr;
    } 

    private selector = (name : string, options:{} = {} ,attr:{} = {}) => {
        let build = (type:string) => {
            let tag : string = "";
            let childAttr = {};
            let flg = (type === "radio") ? "checked" : "selected";
            for(let key in options){
                childAttr["value"] = key;

                if(attr["value"] + "" === key){
                    childAttr[flg] = flg;
                }
                if(type === "select"){
                    tag += this.tag.wrap("option" , options[key] , childAttr);
                    continue;
                }
                if(type === "radio"){
                    childAttr["type"] = "radio";
                    tag +=  this.input( name , childAttr);
                    continue;
                }
            }
            return tag;
        }
        let selector = {
            select : () => {
                return build("select");
            },
            radio : () => {
                return build("radio");
            }
        }
        return selector;
    }

    radio = ( name : string, options:{} = {} ,attr:{} = {}) => {
        let childAttr = {};
        return this.postProcess( name , this.selector(name,options,attr).radio() );
    }

    select = (name : string ,options : {} = {}, attr : {} = {}) : string => {
        attr = this.initAttr(name,attr);
        let tag = this.selector(name,options,attr).select();
        attr = this.removeAttr("value",attr);
        return this.postProcess( name, this.tag.wrap("select",tag,attr) );
    }

    checkbox = (name : string , attr : {} = {}) : string => {
        attr = this.initAttr(name,attr);
        attr["type"] = "checkbox";
        return this.postProcess( name , this.tag.create("input",attr));
    }

    file = (name : string , attr : {}) => {
        attr = this.initAttr(name,attr);
        attr["type"] = "file"
        return this.postProcess( name, this.input(name,attr) );
    }
    
    method = ( name ) => {
        return this.input("_method" , { type : "hidden" , value : name});
    }

    
}
