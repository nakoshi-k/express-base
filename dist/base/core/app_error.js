"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class app_error {
    constructor(message) {
        this.message = message;
        this.name = 'app_error';
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
exports.app_error = app_error;
class input_error extends app_error {
}
exports.input_error = input_error;
class response_error extends app_error {
}
exports.response_error = response_error;
