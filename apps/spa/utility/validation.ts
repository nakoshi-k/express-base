class form_validation_class{
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

    map = ( call : any ) => {
      if(call === "all" ){
          call = Object.keys(this);
      }
      let map:{} = {};
      for(let idx in call){
          if( typeof this[ call[idx] ] === 'undefined'){
              continue;  
          }
          if( call[idx].charAt(0) === '_'){
              continue;  
          }
          
          if( call[idx] === 'map'){
              continue;  
          }
          if( call[idx] === 'constructor'){
              continue;  
          }
          if( typeof idx === 'number'){
              map[ call[String(idx)] ] = this[ call[String(idx)] ];
              continue;  
          }
          map[ call[idx] ] = this[ call[idx] ];
      }
      return map;
  }

}
export default new form_validation_class(); 