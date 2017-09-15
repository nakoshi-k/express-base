"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../base/helper");
describe('pagination_helper', () => {
    let ci = require('chai');
    let assert = ci.assert;
    let pagination = new helper_1.pagination();
    it("test", () => {
        let page = { totalPage: 6,
            currentPage: 3,
            queryPrams: { a: '123', aaa: '12' }
        };
        console.log(pagination.render(page, { path: "page/#/" }));
    });
});
