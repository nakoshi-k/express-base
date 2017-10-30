import ee from "./interfaces/express_extends"
import e from "express"
export interface routing_map{
    method : string,
    route : string,
    middlewares : string[],
    pre? : string[]

}

export class core_routing{

    mapping:{ [propName: string]: routing_map } 

    private strip_object_key = (obj:object) =>{
        let ary = [];
        for(let k in obj){
            ary.push(obj[k]);
        }
        return ary;
    }

    pre_mw : {[prop : string] : (req : ee.request,res : ee.response,next : ee.next) => void }

    pre_mw_regist = ( key:string , mw : (req : ee.request,res : ee.response,next : ee.next) => void ) => {
        this.pre_mw[key] = mw
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
            let mw = this.mw_pull(m.middlewares);
            let pre_mw = this.strip_object_key(this.pre_mw)
            router[ m.method ]( m.route , ...pre_mw , ...mw  );
        })
        return router;
    }
}