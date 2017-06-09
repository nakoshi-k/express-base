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
        for(let key in def){
            if( key in attr){
                continue;
            }
            attr[key] = def[key];
        }
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
        attr["name"] = name;
        if("value" in attr){
            return this.tag.create( "input" , attr );
        }
        if( name in this.bindData){
            attr["value"] = this.bindData[name];
        }
        return this.tag.create("input",attr);
    }

    textarea = ( name:string , attr = {} ) => {
        attr["name"] = name;
        let innerContent = "";
        if("value" in attr){
            innerContent = attr["value"];
            delete attr["value"];
            return this.tag.wrap( "textarea" , innerContent , attr);
        }

        if( name in this.bindData){
            innerContent = this.bindData[name];
        }
        
        delete attr["value"];
        return this.tag.wrap( "textarea" , innerContent , attr);
    }
    
    radio = ( name : string, options:{} ,attr:{}) => {
    
    }

    select = (name : string ,options : {} , attr : {}) => {

    }
    
    file = (name : string , attr : {}) => {

    }
    
}

module.exports = new form_helper();