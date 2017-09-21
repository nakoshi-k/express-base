import * as flatpickr from "flatpickr";

const confirmDatePlugin = require("confirmDatePlugin");

import {u,ajax} from "umbrellajs";

global["u"] = u;

flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});

const remodal = require("remodal");

class xhrPost {
    private fd:any;
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

    private formToJson = (form) => {
        let json = {};
        let inputs = form.find("input,select,textarea");
        inputs.each(function(node,i){
            let c = u(node).first();
            let name = c.name;
            if(c.type === "text"){
                json[name] =  c.value;
                return;
            }            
            if(c.type === "radio"){
                if(c.checked){
                    json[name] =  c.value;
                }
                return;
            }
            if(c.type === "checkbox"){
                json[name] = null;
                if(c.checked){
                    json[name] = c.value;
                }
                return;
            }
            if(u(node).is("select")){
                json[name] = [];
                u.children('option:selected').each(function(node , i) {
                    json[name].push( node.first().value )
                });
                if(json[name].length === 0){
                    json[name] = json[name][0];
                }
                return;
            }            
        });
        return json;
    }
    
    constructor(selector:string){
        let form = u(selector);
        this.form = form;
        this.method = this.getMethod(form);
        let t = document.getElementById("add");
        this.action = form.attr("action");
        this.token = form.children('[name="_csrf"]').attr("value");
    }

    public send = () => {
        fetch( this.action , {
            credentials: 'same-origin' ,
            method: this.method,
            body :JSON.stringify ( this.formToJson(this.form) ),
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'X-XSRF-Token': this.token,
            'Content-Type': 'application/json'
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


u(".xhr-post").on( "click" , function(event){
    event.preventDefault();
    let selector = u(this).attr("data-target");
    let xhr = new xhrPost( selector ); 
    xhr.success = (res:JSON) => {
        console.log(res);
        return;
    }
    
    xhr.faild = (res:JSON) => {
        console.log(res);
        return;
    }

    xhr.error = (res) => {
        return;
    }

    xhr.send();
    return false;
})
