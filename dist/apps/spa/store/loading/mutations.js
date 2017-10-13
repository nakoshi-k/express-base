"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("../mutations");
class mutations extends mutations_1.mutations {
    constructor(options) {
        super();
        this.setIndicator = ({ indicator }, { status, complate }) => {
            let before = indicator.complate;
            indicator.status = status;
            if (complate >= 100) {
                indicator.prosess = false;
                setTimeout(() => {
                    indicator.status = "primary";
                }, 500);
            }
            else {
                indicator.prosess = true;
            }
            if (before > complate) {
                indicator.show = false;
                indicator.complate = 0;
                setTimeout(() => {
                    indicator.show = true;
                    indicator.complate = complate;
                }, 1);
                return;
            }
            indicator.show = true;
            indicator.complate = complate;
        };
        this.loading = (state) => {
            this.setIndicator(state, { status: "success", complate: 8 });
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
