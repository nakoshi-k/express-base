let umbrellajs = require("umbrellajs");
let u = umbrellajs.u;
let flatpickr = require("flatpickr");
let confirmDatePlugin = require("confirmDatePlugin");

flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});

let remodal = require("remodal");

class xhrPost {
    private fd:FormData;
    private action:string;
    constructor(selector:string){
        let form = u(selector);
        this.fd = new FormData(form);
        this.action = form.attr("action");
    }
    public send = () => {
        fetch( '<%= endPoint %>' , {
            credentials: 'same-origin' ,
            method: 'DELETE',
            headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            'X-XSRF-Token': '<%= token %>'
            }
        })
        .then((response) => {
            if(response.status === 200){ location.href = '<%= redirect %>'; return true; };
            alert('failed delete #<%= id %> !');
        });
    }
}