describe('pagination_helper', () => {
    let ci = require('chai');
    let assert = ci.assert;
    let pagination = require("../../helpers/pagination_helper");
    
    it( "build" , () => {
        assert.equal( pagination.build( "/edit/$" , 12 ) , "/edit/12" )
    });
    
});
