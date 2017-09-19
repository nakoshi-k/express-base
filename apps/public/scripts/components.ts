import * as flatpickr from "flatpickr";

const confirmDatePlugin = require("confirmDatePlugin");

import {u,ajax} from "umbrellajs";


flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});

const remodal = require("remodal");

class xhrPost {
    private fd:FormData;
    private form:any;
    private action:string;
    private token:string;
    private method:string;
    private getMethod = (form) => {
        let method = form.children('[name="_method"]').attr("value");
        if( method === ""){
            return form.attr("method");
        };
        return method;
    }
    constructor(selector:string){
        this.form = u(selector);
        let form = this.form;
        this.method = this.getMethod(form);
        this.fd = new FormData(form);
        this.action = form.attr("action");
        this.token = form.children('[name="_csrf"]').attr("value");
    }
    public send = () => {
        console.log(this.token);
        fetch( this.action , {
            credentials: 'same-origin' ,
            method: this.method,
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'X-XSRF-Token': this.token
            }
        })
        .then((response) => {
            if(response.status === 201){ 
                return response.json();
            };
            return response.json();
        }).then((json) => {
             this._success(json);
        }).catch((err) => {
            console.log()
            this._error(err);
        });
    }
    
    private _success = (response) => {};
    private _faild = (response) => {};
    private _error = (response) => {};

    public set success( func : (res) => any ){
        this._success = func;
    }

    public set faild( func : ( res ) => any ){
        this._faild= func;
    }

    public set error( func : (res) => any){
        this._error = func;
    }

}



u(".xhr-post").on( "click" , function(){
    let selector = u(this).attr("data-target");
    let xhr = new xhrPost( selector ); 
    xhr.success = (json) => {
        console.log(json);
        return;
    }
    xhr.faild = (res) => {
        console.log(res);
        return;
    }
    xhr.error = (res) => {
        console.log(res);
        return;
    }
    xhr.send();
    return false;
})