import {helper_base} from "./helper_base";
import {tag_helper as tag } from "./tag_helper";
import {config} from "../common";
interface pagenationInterface {
    query :any,
    totalPage : number,
    currentPage : number,
}
class pagination_helper extends helper_base{
    private page :any = {};
    private path : string = "example/#";
    private tag : tag; //tagHelperが入る

    constructor(){
        super();
        this.load("tag"); //Tagヘルパーの呼び出し。
    }
    
    private appendQuery(){
        //encodeURIComponent(JSON.stringify(object_to_be_serialised))
        let prts = this.page.queryPrams;
        if(prts.length === 0){
            return "";
        }
        let q :string = "";
        Object.keys(prts).forEach(function(key) {
            q+= "&" + encodeURIComponent(key) + "=" + encodeURIComponent(prts[key]);
          });
        return q.replace("&","?");
    }
    private build =  ( path :string , num : number) => {
        this.appendQuery();
        return path.replace( "#" , String(num) ) + this.appendQuery() ;
    }

    public start = ( pagenationInterface , path) : string => {
        this.page = pagenationInterface;
        this.path = path;
        return this.tag.create("ul");
    } 
    
    public first = () :string => {
        let sep = config.sep
        let path = this.path;
        let link = this.tag.wrap( "a" , "first" , { href : this.build(path,1) } );
        return this.tag.wrap("li" , link ,{ class : "" });
    }
    
    public prev = () : string => {
        let path = this.path;
        let link = this.tag.wrap( "a" , "prev" , { href :  this.build(path,1) } );
        return this.tag.wrap("li" , link ,{ class : "" });
    }    
    
    public numbers = () : string => {
        return "";
    }
    
    public next = () => {
        let link = this.tag.wrap( "a" , "next" , { href : "" } );
        return this.tag.wrap("li" , link ,{ "class" : "" });
    }

    public last  = () => {
        let link = this.tag.wrap( "a" , "last" , { href : "" } );
        return this.tag.wrap("li" , link ,{ class : "" });
    }

    public end = () => {
        this.page = {};
        return this.tag.create("/ul");
    }
    
    public render = (pagenationInterface,option: { path : string } = { path : "aaa/#" }) => {
        let html = this.start( pagenationInterface,option.path);
        html += this.first();
        html += this.prev();
        html += this.numbers();
        html += this.next();
        html += this.last();
        html += this.end();
        return html;
    }   
}

module.exports = new pagination_helper();