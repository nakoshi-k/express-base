let u = require("umbrellajs");
let flatpickr = require("flatpickr");
let confirmDatePlugin = require("confirmDatePlugin");

flatpickr(".calendar", {
    "enableTime": true,
    "plugins": [new confirmDatePlugin({})]
});