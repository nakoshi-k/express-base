import {server} from "./server";

import {main} from "../app";
let app = new main();
app.ready().then((res) => {
    new server(res,4000);
})