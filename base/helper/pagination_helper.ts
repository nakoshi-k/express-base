import {helper,config} from "../core";
import {tag_helper} from "../helper";
interface pagenationInterface {
    query :any,
    totalPage : number,
    currentPage : number,
}

class paginationConfig{
    wrap : {tag:string,tagClass:string }
         = {tag:"nav",tagClass:"pagination"};
    parent :{tag:string,tagClass:string}
           = {tag:"ul",tagClass:"pagination-list"};
    child : {tag:string , tagClass:string,linkClass:string}
          = {tag:"li",tagClass:"",linkClass:""};
    disable : {tagClass : string , innerTag : string , innerClass : string }
            = {tagClass:"disable", innerTag : "a" ,innerClass : "disable"  };
    prev : {tagClass : string , innerTag : string , innerClass : string }
            = {tagClass:"prev", innerTag : "span" , innerClass:""};
    next : {tagClass : string , innerTag : string , innerClass : string }
            = {tagClass:"next", innerTag : "span" , innerClass:""};
    first : {tagClass : string , innerTag : string , innerClass : string }
            = {tagClass:"first", innerTag : "span" , innerClass:""};
    last : {tagClass : string , innerTag : string , innerClass : string }
            = {tagClass:"last", innerTag : "span" , innerClass:""};
    active : {tagClass : string , innerTag : string , innerClass : string }
           = {tagClass:"active", innerTag : "a" , innerClass:""};
    text : { first : string , last : string, prev : string, next : string }  
         = { first : "&laquo; First", last : "Last &raquo;", prev : "&lsaquo; Prev", next : "Next &rsaquo;" }
    
}

export class pagination_helper extends helper{
    private page :any = {};
    private path : string = "/page/#";
    private tag : tag_helper; //tagHelperが入る
    private _config :paginationConfig;

    constructor(){
        super();
        this.tag = new tag_helper();
        this.config = new paginationConfig();
    }
    
    get config () {
        return this._config;
    }

    set config (config:paginationConfig) {
        this._config = config;
    }
    
    private appendQuery(){
        let prts = this.page.queryPrams;
        if(prts.length === 0){
            return "";
        }
        let q :string = "";
        Object.keys(prts).forEach(function(key) {
            q += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(prts[key]);
          });
        return q.replace("&","?");
    }

    public start = ( pagenationInterface , path) => {
        this.page = pagenationInterface;
        this.path = path;
    } 
    
    private buildPath =  ( path :string , innerText : string) => {
        this.appendQuery();
        return path.replace( "#" , innerText ) + this.appendQuery() ;
    }
    
    private buildLinkTag = (innerText : string , pageNum :number ) => {
        let path = this.path;
        let child = this.config.child;
        let linkOpt =  { href : this.buildPath(path, String(pageNum) ) , class : child.linkClass  };
        let link = this.tag.wrap( "a" , innerText ,linkOpt );
        return link;
    }

    private buildDisableTag = (innerText : string , pageNum :number ) => {
        let disable = this.config.disable;
        let Opt =  { class : disable.innerClass };
        let link = this.tag.wrap( disable.innerTag , innerText , Opt );
        return link;
    }
    
    private buildAvtiveTag = (innerText : string , pageNum :number ) => {
        let active = this.config.active;
        let Opt =  { href : "#" , class : active.innerClass };
        let link = this.tag.wrap( active.innerTag , innerText , Opt );
        return link;
    }

    private isActive = ( pageNum :number ):boolean => {
        if( this.page.currentPage === pageNum ){
            return true;
        }
        return false;
    }

    private buildChild(innerText : string, addClass = ""){
        let child = this.config.child;
        addClass = (addClass === "" ) ? "" : " " + addClass;
        let cssClass  = child.linkClass + addClass;
        return this.tag.wrap(child.tag, innerText, {class :  cssClass.trim() } );
    }        

    public special = ( name , disableCondition = false, pageNum : number) => {
        if(this.page.totalPage === 0){
            return "";
        }
        let innerText = this.config.text[name];
        let tag : string = this.buildLinkTag(innerText,pageNum);
        let addClass = this.config[name].tagClass;
        if( disableCondition ){
            tag = this.buildDisableTag(innerText,pageNum);
            addClass += " " + this.config.disable.tagClass;
        }
        return "\n" + this.buildChild( tag , addClass );
    }
    
    public first = () :string => {
        let disableCondition = (this.page.currentPage === 1);
        return this.special("first",disableCondition ,1);
    }
    
    public last  = () => {
        let lastPage = this.page.totalPage;
        let disableCondition = (this.page.currentPage === lastPage);
        return this.special("last",disableCondition ,lastPage);
    }

    public prev = () : string => {
        let prevPage = this.page.currentPage - 1;
        let disableCondition = (prevPage < 1);
        return this.special("prev",disableCondition ,prevPage);
    }

    public next = () : string => {
        let nextPage = this.page.currentPage + 1;
        let disableCondition = (nextPage > this.page.totalPage);
        return this.special("next",disableCondition ,nextPage);
    }

    public numbers = () : string => {
        let source = "";
        let c = this.page.totalPage;
        for (let i = 1; i <= c ;i++){
            let link = this.buildLinkTag(String(i),i);
            let addClass = "";
            if(this.isActive(i)){
                link = this.buildAvtiveTag(String(i),i);
                addClass = this.config.active.tagClass;
            }
            source += "\n" + this.buildChild( link , addClass ) ;
        }
        return source;
    }


    public end = () => {
        this.page = {};
    }

    public wrap = (source : string) => {
        if( this._config.wrap ) {
           let conf = this._config.wrap;
           source = this.tag.wrap( conf.tag , source , {class:conf.tagClass} )
        }
        return source;
    } 
    
    public render = (pagenationInterface,option: { path : string } = { path : "/page/#" }) => {
        this.start( pagenationInterface,option.path);
        let html = "";
        html += this.first();
        html += this.prev();
        html += this.numbers();
        html += this.next();
        html += this.last();
        let parent = this._config.parent;
        html = this.tag.wrap( parent.tag , html , {class : parent.tagClass});
        return this.wrap(html);
    }   
}
