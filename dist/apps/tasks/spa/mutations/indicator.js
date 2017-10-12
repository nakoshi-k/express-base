"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class indicator {
    constructor() {
        this.setIndicator = (indicator, status, complate) => {
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
            this.setIndicator(state.indicator, "success", 8);
            state.overLay = true;
            state.loading = true;
        };
        this.endLoading = (state, status) => {
            this.setIndicator(state.indicator, status, 100);
            state.loading = false;
            state.overLay = false;
        };
        this.map = (call) => {
            let map = {};
            for (let key in call) {
                if (typeof this[call[key]] === 'undefined') {
                    continue;
                }
                if (typeof key === 'number') {
                    map[call[key]] = this[call[key]];
                    continue;
                }
                map[call[key]] = this[call[key]];
            }
            return map;
        };
    }
}
exports.indicator = indicator;
