
import { pagination as pagination_helper} from "../../base/helper"
describe('pagination_helper', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    let pagination = new pagination_helper();

    it("test" , () => {
        let page = { totalPage: 6,
                     currentPage: 3,
                     queryPrams: { a: '123', aaa: '12' }
                    };
    })


});