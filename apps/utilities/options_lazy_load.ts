import {utility} from "./utility";
import {client_fetch} from "../resources/client_fetch"
let cf = new client_fetch();

class options_lazy_load extends utility{
    
    options_load( options : {text:string,value:string}[] , url :string ){
        
        let def = options[0].value;
        cf.fetch(url,{}).then((res : {text:string,value:string}[]) => {
            res.forEach((v) => {
                if(v.value === def){
                    return
                }
                options.push(v);
            })
        })

    }

}
export default new options_lazy_load(); 