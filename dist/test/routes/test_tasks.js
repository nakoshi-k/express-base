"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('route_tasks', () => {
    let ci = require('chai');
    let assert = ci.assert;
    it("add", (done) => {
        const chai = require('chai');
        const expect = chai.expect();
        const chaiHttp = require('chai-http');
        chai.use(chaiHttp);
        chai.request('http://localhost:3000')
            .get('/tasks/add')
            .end((err, res) => {
            //console.log(res);
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.string;
            //chai.expect(res.body).to.have.property('name');
            //chai.expect(res.body).to.have.property('email');
            done();
        });
    });
});
