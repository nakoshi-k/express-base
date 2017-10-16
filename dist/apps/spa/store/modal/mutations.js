"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setModal = (state, { template, data, show }) => {
            state.template = template;
            state.data = data;
        };
        this.toggleModal = (state) => {
            if (!state.show) {
                state.close = true;
            }
            state.show = (state.show) ? false : true;
        };
        this.closeModal = (state) => {
            state.show = false;
        };
        this.openModal = (state) => {
            state.close = true;
            state.show = true;
        };
    }
}
exports.mutations = mutations;
