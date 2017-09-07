let deepAssign = require('deep-assign');
export class search{
    public _where = {};
    public _query = {};
    
    constructor(query = {}){
        this.query = query;
        return this;
    }

    get build() {
        return this._where;
    }

    set query (query){
        this._query = query;
    }

    get query () {
        return this._query;
    }

    public like = (template, alias:string = "") => {
        return (name,self) => {
            alias = (alias !== "" ) ? alias : name;
            let s = template.replace("{word}", this.query[name] );
            self.add( alias , {$like : s} )
        }
    }
    
    public numericComparison = (name:string,self,alias:string,type : string) => {
        alias = ( alias !== "" ) ? alias : name;
        let rule = {};
        rule[type] = this.query[name];
        self.add( alias , rule );
    }

    public eq = (alias:string = "") => {
        return (name,self) => {
            this.numericComparison(name,self,alias,"$eq");
        }
    }

    public gt = ( alias:string ) => {
        return this.numericComparison(name,self,alias,"$gt"); 
    }
    
    public gte = ( alias:string ) => {
        return this.numericComparison(name,self,alias,"$gte");
    }

    public lt = ( alias:string ) => {
        return this.numericComparison(name,self,alias,"$lt");
    }
    
    public lte = ( alias:string ) => {
        return this.numericComparison(name,self,alias,"$lte"); 
    }

    public add = (name :string , value : {}) => {
        let rule = {};
        rule[name] = value;
        this._where = deepAssign( this._where , rule );
    }

    public append = (name :string , callback = (name,self:object) => {}) => {
        
        if(typeof this.query[name] === undefined){
            return this;
        }
        callback(name,this);
        return this;
    }

}

//export let search = new search_class();