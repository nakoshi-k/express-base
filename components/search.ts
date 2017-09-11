let deepAssign = require('deep-assign');
export class search{
    public _where = {};
    public _query = {};
    
    constructor(query = {}){
        this.query = query;
        return this;
    }

    public build() {
        return this._where;
    }

    set query (query){
        this._query = query;
    }

    get query () {
        return this._query;
    }

    public like = (template, alias:string = "") => {
        return (names,self) => {
            alias = (alias !== "" ) ? alias : names;
            let s = template.replace("{word}", this.query[names] );
            self.add( alias , {$like : s} )
        }
    }
    
   public numericComparison = (names:string,self,alias:string,type : string) => {
        alias = ( alias !== "" ) ? alias : names;
        let rule = {};
        rule[type] = self.query[names];
        self.add( alias , rule );
    }

    public eq = (alias:string = "") => {
        return (names,self) => {
            self.numericComparison(names,self,alias,"$eq")
        };
    }

    public gt = ( alias:string = "" ) => {
        return (names,self) => {
            self.numericComparison(names,self,alias,"$gt")
        }; 
    }
    
    public gte = ( alias:string = "") => {
        return (names ,self) => {
            self.numericComparison(names,self,alias,"$gte");
        }
    }

    public lt = ( alias:string = "") => {
        return (names,self) => {
            self.numericComparison(names,self,alias,"$lt");
        }
    }
    
    public lte = ( alias:string = "") => {
        return (names,self) => {
            self.numericComparison(names,self,alias,"$lte"); 
        }
    }

    public add = (names :string , value : {}) => {
        let rule = {};
        rule[names] = value;
        this._where = deepAssign( this._where , rule );
    }
    
    public between = (alias:string = "") => {
        return (names,self) => {
            alias = (alias !== "" ) ? alias : names;
            self.add( alias , {$between : [ self.query[ names[0] ] ,  self.query[ names[1] ] ]} )
        }
    }

    public append = (names :any, callback = (name,self:object) => {}) => {
        
        if(names === "custom"){
            callback(names,this);
            return;
        }
        
        if(! Array.isArray(names)){
            names = [names];
        }

        for (let i = 0 ; i < names.length; i++){
            if(typeof this.query[ names[i] ] === "undefined"){
                return this;
            }
        }
        
        callback(names,this);

        return this;
    }

}

//export let search = new search_class();