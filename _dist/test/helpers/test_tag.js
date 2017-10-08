"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../base/helper");
describe('tag_helper', () => {
    let tag = new helper_1.tag();
    let ci = require('chai');
    let assert = ci.assert;
    it("create", () => {
        assert.strictEqual(tag.create("form"), "<form>");
        assert.strictEqual(tag.create("form", { name: "test", data: "data" }), '<form name="test" data="data">');
    });
    it("wrap", () => {
        assert.strictEqual(tag.wrap("form"), "<form></form>");
        assert.strictEqual(tag.wrap("form", null, { "class": "test-class" }), '<form class="test-class"></form>');
        assert.strictEqual(tag.wrap("form", "content"), "<form>content</form>");
        assert.strictEqual(tag.wrap("form", "content", { "class": "test-class", "data-test": "data-test" }), '<form class="test-class" data-test="data-test">content</form>');
    });
});
