import {helper_base} from "./helper_base";
import {tag_helper as tag } from "./tag_helper";
interface pagenationInterface {
    query :any,
    totalPage : number,
    currentPage : number,
}
class pagination_helper extends helper_base{
    private page = {};
    private attr = {};
    private tag : tag; //tagHelperが入る

    constructor(){
        super();
        this.load("tag"); //Tagヘルパーの呼び出し。
    }
    
    public start = ( pagenationInterface , attr :{ router:string }) : string => {
        this.page = pagenationInterface;
        this.attr = attr;
        return this.tag.create("ul");
    } 
    
    public first = () :string => {
        let link = this.tag.wrap( "a" , "first" , { "href" : "" } );
        return this.tag.wrap("li" , link ,{ "class" : "" });
    }
    
    public prev = () : string => {
        let link = this.tag.wrap( "a" , "first" , { "href" : "" } );
        return this.tag.wrap("li" , link ,{ "class" : "" });
    }    
    
    public numbers = () : string => {
        return "";
    }
    
    public next = () => {
        let link = this.tag.wrap( "a" , "first" , { "href" : "" } );
        return this.tag.wrap("li" , link ,{ "class" : "" });
    }

    public last  = () => {
        let link = this.tag.wrap( "a" , "last" , { "href" : "" } );
        return this.tag.wrap("li" , link ,{ "class" : "" });
    }

    public end = () => {
        this.page = {};
        this.attr = {};
        return this.tag.create("/ul");
    }
    
    public render = (pagenationInterface,option: { router : string }) => {
        let html = this.start( pagenationInterface,option);
        html += this.first();
        html += this.prev();
        html += this.numbers();
        html += this.next();
        html += this.last();
        html += this.end();
    }   
}

module.exports = new pagination_helper();