import {utility} from "./utility";
class form_validation_class extends utility{


  validationSubmit = (errors) => {
    if(Object.keys(errors).length > 0){
        let clss = "";
        for(let k in errors){
            if(typeof errors[k] === "string"){
              clss = "warning"
              break;
            }
            return this.validationSubmit(errors[k])
        }
        return clss
    }else{
      return "";
    }
  }

  validationClass = (errors,name,sub:string[] = []) => {

      if(name === "submit"){
        return this.validationSubmit(errors);
      }

      if(errors[name]){
        return "warning"
      }
      let clss = "";
      sub.forEach((v) => {
        if(errors[v]){
          clss = "warning"
        } 
      })
      return clss
  }

}
export default new form_validation_class(); 