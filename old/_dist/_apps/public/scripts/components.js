"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatpickr = require("flatpickr");
const confirmDatePlugin = require("confirmDatePlugin");
const umbrellajs_1 = require("umbrellajs");
global["u"] = umbrellajs_1.u;
flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});
const remodal = require("remodal");
class xhrPost {
    constructor(selector) {
        this.getMethod = (form) => {
            let method = form.children('[name="_method"]').attr("value");
            if (method === "") {
                return form.attr("method");
            }
            ;
            return method;
        };
        this.formToJson = (form) => {
            let json = {};
            let inputs = form.find("input,select,textarea");
            inputs.each(function (node, i) {
                let c = umbrellajs_1.u(node).first();
                let name = c.name;
                if (c.type === "text") {
                    json[name] = c.value;
                    return;
                }
                if (c.type === "radio") {
                    if (c.checked) {
                        json[name] = c.value;
                    }
                    return;
                }
                if (c.type === "checkbox") {
                    json[name] = null;
                    if (c.checked) {
                        json[name] = c.value;
                    }
                    return;
                }
                if (umbrellajs_1.u(node).is("select")) {
                    json[name] = [];
                    umbrellajs_1.u.children('option:selected').each(function (node, i) {
                        json[name].push(node.first().value);
                    });
                    if (json[name].length === 0) {
                        json[name] = json[name][0];
                    }
                    return;
                }
            });
            return json;
        };
        this.send = () => {
            fetch(this.action, {
                credentials: 'same-origin',
                method: this.method,
                body: JSON.stringify(this.formToJson(this.form)),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-Token': this.token,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                if (response.status === 201) {
                    return response.json();
                }
                ;
                return response.json();
            }).then((json) => {
                this._success(json);
            }).catch((err) => {
                this._error(err);
            });
        };
        this._success = (response) => { };
        this._faild = (response) => { };
        this._error = (response) => { };
        let form = umbrellajs_1.u(selector);
        this.form = form;
        this.method = this.getMethod(form);
        let t = document.getElementById("add");
        this.action = form.attr("action");
        this.token = form.children('[name="_csrf"]').attr("value");
    }
    set success(func) {
        this._success = func;
    }
    set faild(func) {
        this._faild = func;
    }
    set error(func) {
        this._error = func;
    }
}
umbrellajs_1.u(".xhr-post").on("click", function (event) {
    event.preventDefault();
    let selector = umbrellajs_1.u(this).attr("data-target");
    let xhr = new xhrPost(selector);
    xhr.success = (res) => {
        return;
    };
    xhr.faild = (res) => {
        return;
    };
    xhr.error = (res) => {
        return;
    };
    xhr.send();
    return false;
});
