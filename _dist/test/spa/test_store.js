"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_store = require("../../base/core/spa/store");
class actions extends base_store.actions {
    constructor() {
        super(...arguments);
        this.test = () => {
            return "";
        };
    }
}
class mutations extends base_store.mutations {
}
class state extends base_store.state {
}
describe('store', () => {
    let ai = new actions();
    it("actions", () => {
        console.log(ai);
    });
});
