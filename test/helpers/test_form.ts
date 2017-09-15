
import {form as form_helper} from "../../base/helper"
describe('form_helper', () =>  {

    let ci = require('chai');
    let assert = ci.assert;

    it("start", () => {
        let form = new form_helper();
        assert.strictEqual(form.start("form"), '<form method="post" name="form">');
        assert.strictEqual(form.start("form2",{},{method : "get",action:"test"}), '<form method="get" action="test" name="form2">');
    });


    it("end", () => {
        let form = new form_helper();
        assert.strictEqual(form.end(), '</form>');
    });


    it("input", () => {
        let form = new form_helper();
        assert.strictEqual(form.input("test"), '<input name="test">');
        // startでデータバインドされている場合
        form.start("name",{test:"testvalue"})
        assert.strictEqual(form.input("test"), '<input name="test" value="testvalue">');
        form.end();
    });



    it("select" , () => {
        let form = new form_helper();
        assert.strictEqual(form.select("test",{1:"first",2:"second",3:"therd"}), '<select name="test"><option value="1">first</option><option value="2">second</option><option value="3">therd</option></select>');
        assert.strictEqual(form.select("test",{1:"first",2:"second",3:"therd"},{value:3}), '<select name="test"><option value="1">first</option><option value="2">second</option><option value="3" selected="selected">therd</option></select>');
    })


    it("radio" , () => {
        let form = new form_helper();
        assert.strictEqual(form.radio("test",{1:"first",2:"second",3:"therd"}), '<input value="1" type="radio" name="test"><input value="2" type="radio" name="test"><input value="3" type="radio" name="test">');
        assert.strictEqual(form.radio("test",{1:"first",2:"second",3:"therd"},{value:3}), '<input value="1" type="radio" name="test"><input value="2" type="radio" name="test"><input value="3" type="radio" name="test" checked="checked">');
    })

    it("checkbox" , () => {
        let form = new form_helper();
        assert.strictEqual(form.checkbox("test"), '<input name="test" type="checkbox">');
        form.start("name",{test:"testvalue2"});
        assert.strictEqual(form.checkbox("test",{value:123}), '<input value="123" name="test" type="checkbox">');
        form.end();
    })

    it("textarea", () => {
        let form = new form_helper();
        form.end();
        
        assert.strictEqual(form.textarea("test"), '<textarea name="test"></textarea>');
        assert.strictEqual(form.textarea("test",{value : "innertext"}), '<textarea name="test">innertext</textarea>');
        //startでバインドされた場合のテスト
        form.start("name",{test:"testvalue"})
        assert.strictEqual(form.textarea("test"), '<textarea name="test">testvalue</textarea>');
        form.end();
    });


});