import {helper_base} from "./helper_base";
class form_helper extends helper_base{
    private bindData = {};
    
    private tag; //tagHelperが入る

    constructor(){
        super();
        this.load("tag"); //Tagヘルパーの呼び出し。
        this.bindData = {};
    }

    private bind = (bindData : {} = {}) =>{
        this.bindData = Object.assign( this.bindData ,bindData);
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
        return this.tag.create( "input" , { name : "_csrf" , value : token , type : "hidden"});
    }
    start = (name:string , bindData : {},attr = {}) => {
        this.bind(bindData);
        let def = {
            method : "post",
            action : ""            
        }
        let csrfTag :string = "";
        if( "csrf" in this.bindData){
            csrfTag = this.csrf(this.bindData["csrf"]);
        }
        attr["name"] = name;
        attr = Object.assign(def,attr);
        return this.tag.create("form",attr) + csrfTag;
    }
    
    end = () => {
        this.unBind();
        return this.tag.create("/form");
    }   

    submit = ( title : string , attr:{} = { class : "button primary" }) => {
        return this.tag.wrap("button", title , attr );
    }

    input = ( name:string , attr = {}) => {
        attr = this.initAttr(name,attr)
        return this.tag.create("input",attr);
    }

    textarea = ( name:string , attr = {} ) => {
        attr = this.initAttr(name,attr);
        let innerContent = attr["value"];
        attr = this.removeAttr("value",attr);
        return this.tag.wrap( "textarea" , innerContent , attr);
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
        return this.selector(name,options,attr).radio();
    }

    select = (name : string ,options : {} = {}, attr : {} = {}) : string => {
        attr = this.initAttr(name,attr);
        let tag = this.selector(name,options,attr).select();
        attr = this.removeAttr("value",attr);
        return this.tag.wrap("select",tag,attr);
    }

    checkbox = (name : string , attr : {} = {}) : string => {
        attr = this.initAttr(name,attr);
        attr["type"] = "checkbox";
        return this.tag.create("input",attr);
    }

    file = (name : string , attr : {}) => {
        attr = this.initAttr(name,attr);
        attr["type"] = "file"
        this.input(name,attr);
    }
    
}

module.exports = new form_helper();