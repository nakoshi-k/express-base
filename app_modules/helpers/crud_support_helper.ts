import {helper_base} from "./helper_base";

export class crud_support_helper extends helper_base{
    private tag; //tagHelperが入る
    
    constructor(){
        super();
        this.load("tag"); //Tagヘルパーの呼び出し。
    }
    
    public delete = ( title :string , options = { path : "example" , id : "id" , csrf : "csrf" , redirect : "redirect" } ) => {
        
        var node_uuid = require('node-uuid');
        let uuid = node_uuid.v4().split("-").join("");
        let delFunc = "del_" + uuid;
        let fd = "fd_" + uuid;
        let endPoint = String(options.path) + "/" + String(options.id);
        
        let script = [""];
        script.push( "function del_" + uuid + "(){" );
        script.push( "if(!confirm( 'you hope delete #" + options.id + " ?'  )){return false;};");
        script.push( "var xhr = new XMLHttpRequest();");
        script.push( "var fd = new FormData();");

        script.push( "xhr.addEventListener('load', function(event) {");
        script.push( "console.log(event);");
        script.push( "  alert('Yeah! Data sent and response loaded.');");
        script.push( "});");
        
        script.push( "xhr.addEventListener('error', function(event) {");
        script.push( "  alert('Oups! Something goes wrong.');");
        script.push( "});");
        
        script.push( "xhr.open('DELETE', '"+ endPoint + "');");
        script.push( "xhr.setRequestHeader('X-XSRF-Token', '" + options.csrf + "')");
        script.push( "xhr.send(fd);");
        script.push( "return false;");
        script.push( "}");
        script.push("");

        let src = this.tag.wrap("script" , script.join("\n") ) 
        src += this.tag.wrap("a" ,  title, {href : "#" , onClick : delFunc + "()" }) ;
        return src;
    }

}

module.exports = new crud_support_helper();