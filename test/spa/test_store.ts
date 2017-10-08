import * as base_store from "../../base/core/spa/store";

class actions extends base_store.actions{
    private test = () => {
        return ""
    }
}

class mutations extends base_store.mutations{
    
}


class state extends base_store.state{
    
}




describe('store', () =>  {
    let ai = new actions();
    it("actions" , () => {
        console.log(ai);
    })
    
});