"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("../../components/search");
describe('search', () => {
    let ci = require('chai');
    let assert = ci.assert;
    it("test", () => {
        let conditions = new search_1.search({ title: 20, bt1: 0, bt2: 100 });
        conditions.append("title", conditions.like("%{word}%", "title"));
        conditions.append("title", conditions.eq("title"));
        conditions.append(["bt1", "bt2"], conditions.between("title"));
        let check = { title: { '$like': '%20%', '$eq': 20, '$between': [0, 100] } };
        assert.strictEqual(JSON.stringify(check), JSON.stringify(conditions.build()));
    });
});
