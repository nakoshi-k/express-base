import {utility} from "./utility";
import {client_fetch} from "../resources/client_fetch"
let cf = new client_fetch();

interface options_default{
    options :{text:string,value:string , disabled?:boolean }[] ,
    text : string,
    value : string,
    emptyText : string ,
    allowNull : boolean
}

class options_lazy_load extends utility{
    
    options_load( value :string ,  options : {text:string,value:string , disabled?:boolean }[] , url :string ,e){
        e.target.classList.toggle('loading')
        cf.fetch(url,{}).then((res : {text:string,value:string}[]) => {
            res.forEach((v) => {
                if(v.value === value){
                    return
                }
                options.push(v);
            })
            e.target.classList.toggle('loading')
        })

    }

    set_options_default(config : options_default){
        config.options.push({text: "please select one" ,value : "" , disabled : true })
        config.options.push({ text : config.text , value : config.value })
        if(config.allowNull){
            config.options.push({text: "none" ,value : "" })
        }
    }

}
export default new options_lazy_load(); 