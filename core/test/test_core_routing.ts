import {core_routing as core_routeing_class} from "../core_routeing"

export class router extends core_routeing_class {
   
}

describe('test_core_routing', () =>  {
    const core_routeing = new router()
    
    it("strip_object_key" , (done) => {
        const a = core_routeing.map()
        console.log(a)
        done()
    })

});