"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_base_1 = require("./helper_base");
class crud_support_helper extends helper_base_1.helper_base {
    constructor() {
        super();
        this.delete = (title, options = { path: "example", id: "id", csrf: "csrf", redirect: "redirect" }) => {
            var node_uuid = require('node-uuid');
            let uuid = node_uuid.v4().split("-").join("");
            let delFunc = "del_" + uuid + "()";
            let fd = "fd_" + uuid;
            let endPoint = options.path.replace("#", String(options.id));
            let src = "";
            src += "<script>" + "\n";
            src += "    function " + delFunc + "{" + "\n";
            src += "        if(!confirm('are you hope delete #" + options.id + " ?')){" + "\n";
            src += "            return false;" + "\n";
            src += "        }" + "\n";
            src += "        fetch( '" + endPoint + "' , {" + "\n";
            src += "            credentials: 'same-origin' ," + "\n";
            src += "            method: 'DELETE'," + "\n";
            src += "            headers: {" + "\n";
            src += "            'X-Requested-With': 'XMLHttpRequest' ," + "\n";
            src += "            'X-XSRF-Token': '" + options.csrf + "'" + "\n";
            src += "            }" + "\n";
            src += "        })" + "\n";
            src += "        .then((response) => {" + "\n";
            src += "            if(response.status === 200){ location.href = '" + options.redirect + "'; return true; };" + "\n";
            src += "            alert('failed delete #" + options.id + "!');" + "\n";
            src += "        });" + "\n";
            src += "        return false;" + "\n";
            src += "    }" + "\n";
            src += "</script>" + "\n";
            return src + this.tag.wrap("a", "delete", { "onClick": delFunc });
        };
        this.load("tag"); //Tagヘルパーの呼び出し。
        this.load("ejs_render"); //ejs_renderヘルパーの呼び出し。
    }
}
exports.crud_support_helper = crud_support_helper;
module.exports = new crud_support_helper();
