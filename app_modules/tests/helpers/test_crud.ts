
describe('crud_support_helper', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    let crud = require("../../helpers/crud_support");

    it("test" , () => {
      crud.delete( "delete" , { path: "test",id : "21321" , csrf : "afdsa989hf9shah9d8h9fh" , redirect : "aaaaaa"} )
      .then( (res) => {
          console.log(res);
      });
    })


});