import {helper} from "../core/helper";
export class tag_helper extends helper{

    private buildAttr  = (attr:{}) : string => {
        let attribute =  "";
        for(let key in attr){
            if(attr[key] === ""){
                continue;
            }
            attribute += ` ${key}="${attr[key]}"`;            
        }
        return attribute; 
    }

    create = (tagName:string,attr : {} = {}) : string => {

        return `<${tagName}${this.buildAttr(attr)}>`;
    }

    wrap = ( tagName:string , content : string = "",attr : {} = {}) => {
        content = (content === null) ? "" : content;
        let tag = `
                ${this.create(tagName,attr) }
                    ${content}
                ${ this.create("/" + tagName) }  
            `;
        return tag;
    }

}
