describe('form_helper', () => {
    let form = require("../../helpers/form_helper");
    let ci = require('chai');
    let assert = ci.assert;
    it("start", () => {
        assert.strictEqual(form.start("form"), '<form name="form" method="post" action="">');
        assert.strictEqual(form.start("form2", {}, { method: "get", action: "test" }), '<form method="get" action="test" name="form2">');
    });
    it("end", () => {
        assert.strictEqual(form.end(), '</form>');
    });
    it("input", () => {
        assert.strictEqual(form.input("test"), '<input name="test">');
        // startでデータバインドされている場合
        form.start("name", { test: "testvalue" });
        assert.strictEqual(form.input("test"), '<input name="test" value="testvalue">');
    });
});
