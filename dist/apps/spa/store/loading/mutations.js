"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setIndicator = ({ indicator }, { status, complate }) => {
            let before = indicator.complate;
            indicator.status = status;
            indicator.show = true;
            indicator.complate = complate;
            if (complate >= 100) {
                indicator.prosess = false;
                if (status === "success") {
                    indicator.status = "primary";
                }
            }
            else {
                indicator.prosess = true;
            }
        };
        this.loading = (state, status) => {
            this.setIndicator(state, { status: status, complate: 3 });
            state.overLay = true;
            state.loading = true;
        };
        this.endLoading = (state, status) => {
            this.setIndicator(state, { status: status, complate: 100 });
            state.loading = false;
            state.overLay = false;
        };
    }
}
exports.mutations = mutations;
