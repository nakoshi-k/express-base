"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
class form_validation_class extends utility_1.utility {
    constructor() {
        super(...arguments);
        this.validationClass = (errors, name) => {
            if (name === "submit") {
                if ((Object.keys(errors).length > 0)) {
                    return "warning";
                }
            }
            if (errors[name]) {
                return "warning";
            }
        };
    }
}
exports.default = new form_validation_class();
