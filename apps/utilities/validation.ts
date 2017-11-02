import {utility} from "./utility";
class form_validation_class extends utility{
    validationClass = (errors,name) => {
        if(name === "submit"){
           if( (Object.keys(errors).length > 0) ){
             return "warning"
           }
        }
        if(errors[name]){
          return "warning"
        }
    }

}
export default new form_validation_class(); 