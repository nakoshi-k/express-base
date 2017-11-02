"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
class form_validation_class extends utility_1.utility {
    constructor() {
        super(...arguments);
        this.validationSubmit = (errors) => {
            if (Object.keys(errors).length > 0) {
                let clss = "";
                for (let k in errors) {
                    if (typeof errors[k] === "string") {
                        clss = "warning";
                        break;
                    }
                    return this.validationSubmit(errors[k]);
                }
                return clss;
            }
            else {
                return "";
            }
        };
        this.validationClass = (errors, name, sub = []) => {
            if (name === "submit") {
                return this.validationSubmit(errors);
            }
            if (errors[name]) {
                return "warning";
            }
            let clss = "";
            sub.forEach((v) => {
                if (errors[v]) {
                    clss = "warning";
                }
            });
            return clss;
        };
    }
}
exports.default = new form_validation_class();
