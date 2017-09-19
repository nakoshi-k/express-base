
import {cell as cell_helper} from "../../base/helper"
describe('cell_helper', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    let cell = new cell_helper();

    it("test" , (done) => {
        cell.add( "delete" , "delete" );

        var node_uuid = require('node-uuid');
        let uuid = node_uuid.v4().split("-").join("");
        let delFunc = "del_" + uuid + "()";
        let endPoint = "tasks/#";
        
        let test = {id:"grea",
             delFunc : delFunc ,
             endPoint:endPoint ,
             token : "csrffdsafdsa" ,
             redirect : "regere"
            } ;

        cell.ready().then((res) => {
            let ren = cell.render("delete" , test);
            done();
        })

    })


});