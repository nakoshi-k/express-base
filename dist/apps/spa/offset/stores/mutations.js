"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../../../../base/spa/stores/mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setOffset = (state, { template, data, show }) => {
            state.template = template;
            state.data = data;
        };
        this.toggleOffset = (state) => {
            if (!state.show) {
                state.close = true;
            }
            state.show = (state.show) ? false : true;
        };
        this.closeOffset = (state) => {
            state.show = false;
        };
        this.openOffset = (state) => {
            state.close = true;
            state.show = true;
        };
    }
}
exports.mutations = mutations;
