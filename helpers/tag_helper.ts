import {helper_base} from "./helper_base";

export class tag_helper extends helper_base{

    private buildAttr  = (attr:{}) : string => {
        let attribute =  "";
        for(let key in attr){
            attribute += " " + key + '="' + attr[key] + '"';            
        }
        return attribute; 
    }

    create = (tagName:string,attr : {} = {}) : string => {
        return "<" + tagName + this.buildAttr(attr) + ">";
    }

    wrap = ( tagName:string , content : string = "",attr : {} = {}) => {
        let tag = "";
        content = (content === null) ? "" : content;
        tag += this.create(tagName,attr) ;
        tag += content;
        tag += this.create("/" + tagName) ;
        return tag;
    }

}

module.exports = new tag_helper();