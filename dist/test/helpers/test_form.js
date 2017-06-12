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
        assert.strictEqual(Object.keys(form.bindData).length, 0);
    });
    it("input", () => {
        assert.strictEqual(form.input("test"), '<input name="test">');
        // startでデータバインドされている場合
        form.start("name", { test: "testvalue" });
        assert.strictEqual(form.input("test"), '<input name="test" value="testvalue">');
        form.end();
    });
    it("select", () => {
        assert.strictEqual(form.select("test", { 1: "first", 2: "second", 3: "therd" }), '<select><option value="1">first</option><option value="2">second</option><option value="3">therd</option></select>');
        assert.strictEqual(form.select("test", { 1: "first", 2: "second", 3: "therd" }, { value: 3 }), '<select><option value="1">first</option><option value="2">second</option><option value="3" selected="selected">therd</option></select>');
    });
    it("radio", () => {
        assert.strictEqual(form.radio("test", { 1: "first", 2: "second", 3: "therd" }), '<input type="radio" value="1" name="test"><input type="radio" value="2" name="test"><input type="radio" value="3" name="test">');
        assert.strictEqual(form.radio("test", { 1: "first", 2: "second", 3: "therd" }, { value: 3 }), '<input type="radio" value="1" name="test"><input type="radio" value="2" name="test"><input type="radio" value="3" checked="checked" name="test">');
    });
    it("textarea", () => {
        assert.strictEqual(form.textarea("test"), '<textarea name="test"></textarea>');
        assert.strictEqual(form.textarea("test", { value: "innertext" }), '<textarea name="test">innertext</textarea>');
        //startでバインドされた場合のテスト
        form.start("name", { test: "testvalue" });
        assert.strictEqual(form.textarea("test"), '<textarea name="test">testvalue</textarea>');
        form.end();
    });
});
