"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_routeing_1 = require("../core_routeing");
class router extends core_routeing_1.core_routing {
}
exports.router = router;
describe('test_core_routing', () => {
    const core_routeing = new router();
    it("strip_object_key", (done) => {
        const a = core_routeing.map();
        console.log(a);
        done();
    });
});
