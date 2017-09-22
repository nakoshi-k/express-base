
import * as models from "./models";

let a = models.tasks.rawAttributes;

for( let k in a){
    console.log(a[k].type)
}