"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class validation_error {
    constructor(err) {
        let validationError = {};
        let errors = err.errors;
        for (let key in errors) {
            let name = errors[key].path;
            let type = errors[key].type;
            let message = errors[key].message;
            if (typeof validationError[name] === "undefined") {
                validationError[name] = [];
            }
            let v = { type: type, message: message };
            validationError[name].push(v);
        }
        return validationError;
    }
}
exports.validation_error = validation_error;
