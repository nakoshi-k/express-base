"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_service_1 = require("../core_service");
class service extends core_service_1.core_service {
    constructor(name) {
        super(name);
        this.name = "tasks";
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 10;
            search.page = req.params.page;
            search.append("id", search.like("%{word}%"));
            search.append("title", search.like("%{word}%"));
            search.append("priod", search.like("%{word}%"));
            search.append("created_at", search.like("%{word}%"));
            search.append("updated_at", search.like("%{word}%"));
            return search.build();
        };
        this.name = name;
    }
}
exports.service = service;
describe('test_core_service', () => {
    const core_service = new service("tasks");
    it("get_list", (done) => {
        core_service.get_list({
            where: {
                title: { "$like": "ff%" }
            }
        }).then(r => {
            done();
        }).catch(e => {
            done(e);
        });
    });
});
