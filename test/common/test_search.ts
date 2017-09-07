import {search} from "../../components/search";
describe('search', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    let conditions = new search({title : 20,custom : "graga"});
    it("test", () => {
        
        conditions.append( "title" , conditions.like("%{word}%") );
        conditions.append( "title" , conditions.eq() );
        conditions.append( "custom" , (name,self:search) => {
           self.add(name,{ "$eq" : self.query["custom"] });
        })
        console.log(conditions.build);
    });

});