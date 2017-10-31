"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class core_error {
    constructor(message) {
        this.message = message;
        this.name = 'app_error';
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
exports.core_error = core_error;
class input_error extends core_error {
    constructor() {
        super(...arguments);
        this.name = "imput_error";
    }
}
exports.input_error = input_error;
class response_error extends core_error {
    constructor() {
        super(...arguments);
        this.name = "response_error";
    }
}
exports.response_error = response_error;
class missing_entity extends core_error {
    constructor() {
        super(...arguments);
        this.name = "missing_entity";
    }
}
exports.missing_entity = missing_entity;
