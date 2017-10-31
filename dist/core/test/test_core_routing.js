"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_routeing_1 = require("../core_routeing");
describe('test_core_routing', () => {
    const core_routeing = new core_routeing_1.core_routing();
    it("strip_object_key", (done) => {
        const a = core_routeing.map();
        console.log(a);
        done();
    });
});
