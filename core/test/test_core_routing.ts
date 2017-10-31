import {core_routing as core_routeing_class} from "../core_routeing"
describe('test_core_routing', () =>  {
    const core_routeing = new core_routeing_class()
    
    it("strip_object_key" , (done) => {
        const a = core_routeing.map()
        console.log(a)
        done()
    })

});