
describe('pagination_helper', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    let pagination = require("../../helpers/pagination_helper");

    it("test" , () => {
        let page = { totalPage: 6,
                     currentPage: 3,
                     queryPrams: { a: '123', aaa: '12' }
                    };
        console.log( pagination.render(page, { path : "page/#/" } ) );
    })


});