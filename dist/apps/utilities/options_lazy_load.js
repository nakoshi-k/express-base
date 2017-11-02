"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
const client_fetch_1 = require("../resources/client_fetch");
let cf = new client_fetch_1.client_fetch();
class options_lazy_load extends utility_1.utility {
    options_load(value, options, url, e) {
        e.target.classList.toggle('loading');
        cf.fetch(url, {}).then((res) => {
            res.forEach((v) => {
                if (v.value === value) {
                    return;
                }
                options.push(v);
            });
            e.target.classList.toggle('loading');
        });
    }
    set_options_default(config) {
        config.options.push({ text: "please select one", value: "", disabled: true });
        config.options.push({ text: config.text, value: config.value });
        if (config.allowNull) {
            config.options.push({ text: "none", value: "" });
        }
    }
}
exports.default = new options_lazy_load();
