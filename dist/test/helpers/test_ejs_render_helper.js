describe('render_helper', () => {
    let ci = require('chai');
    let assert = ci.assert;
    let ejs_render = require("../../helpers/ejs_render_helper");
    it("test", (done) => {
        let page = { totalPage: 6,
            currentPage: 3,
            queryPrams: { a: '123', aaa: '12' }
        };
        ejs_render.render("delete", { url: "example", uuid: "pjpiuhpigsa", token: "77bsdfd9sghf9ds8h", id: "333" })
            .then((res) => {
            console.log(res);
            done();
        }).catch((err) => {
            console.log("13");
            console.log(err);
            done();
        });
    });
});
