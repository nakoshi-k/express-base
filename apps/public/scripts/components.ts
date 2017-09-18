import * as umbrellajs from "umbrellajs";
import flatpickr from "flatpickr";

let confirmDatePlugin = require("confirmDatePlugin");

let u = umbrellajs.u;
flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});

let remodal = require("remodal");

class xhrPost {
    private fd:FormData;
    private form:any;
    private action:string;
    private token:string;
    constructor(selector:string){
        this.form = u(selector);
        let form = this.form;
        this.fd = new FormData(form);
        this.action = form.attr("action");
        this.token = form.children("_csrf").attr("value");
    }
    public send = () => {
        fetch( this.action , {
            credentials: 'same-origin' ,
            method: 'POST',
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'X-XSRF-Token': this.token
            }
        })
        .then((response) => {
            if(response.status === 200){ 
                this.success(response);
            };
            this.faild(response);
        }).catch((err) => {
            this.error(err);
        });
    }
    
    private success = (response) => {

    }

    private faild = (response) => {

    }

    private error = (error) => {

    }
}