import ee from "./interfaces/express_extends"
import e from "express"
export interface routing_map{
    method : string,
    route : string,
    middlewares : string[],
    pre? : string[]

}

export const mapping :  { [propName: string]: routing_map } = {
    test : { method : "get", route : "/", middlewares : [ "test" ] } 
}

export class core_routing{

    get mapping(){
        return mapping;
    }

    protected route : {}

    pre_mw : object[]

    pre_mw_regist = () => {

    }
    
    mw_pull = (names:string[]) => {
        let mw = [];
        mw.push(this["name"]);
        return mw;
    }

    map : ( included?  : string[] ) => ee.router = (included = []) => {
        let router = e.Router();
        let map = this.mapping;
        if(included.length === 0 ){
            included = Object.keys(map);
        }
        included.forEach((key) => {
            let m = map[key];
            let mws = this.mw_pull(m.middlewares); 
            router[ m.method ]( m.route , ...this.pre_mw , ...mws  );
        })
        return router;
    }
}