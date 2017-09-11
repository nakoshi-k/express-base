import {search} from "../../components/search";
describe('search', () =>  {

    let ci:Chai.ChaiStatic = require('chai');
    let assert:Chai.Assert = ci.assert;

    it("test", () => {
        let conditions = new search({title : 20 ,bt1 : 0 , bt2 :100});
        
        conditions.append( "title" , conditions.like("%{word}%","title") );
        conditions.append( "title" , conditions.eq("title") );
        conditions.append( ["bt1","bt2"] , conditions.between("title") );

        let check = { title: { '$like': '%20%', '$eq': 20, '$between': [ 0, 100 ] } } ;

        assert.strictEqual(JSON.stringify(check),JSON.stringify(conditions.build()));
    });

});