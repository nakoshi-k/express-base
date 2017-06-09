describe('tag_helper', () => {
    let tag = require("../../helpers/tag_helper");
    let ci = require('chai');
    let assert = ci.assert;
    it("create", () => {
        assert.strictEqual(tag.create("form"), "<form>");
        assert.strictEqual(tag.create("form", { name: "test", data: "data" }), '<form name="test" data="data">');
    });
    it("wrap", () => {
        assert.strictEqual(tag.wrap("form"), "<form>\n\n</form>");
        assert.strictEqual(tag.wrap("form", null, { "class": "test-class" }), '<form class="test-class">\n\n</form>');
        assert.strictEqual(tag.wrap("form", "content"), "<form>\ncontent\n</form>");
        assert.strictEqual(tag.wrap("form", "content", { "class": "test-class", "data-test": "data-test" }), '<form class="test-class" data-test="data-test">\ncontent\n</form>');
    });
});
