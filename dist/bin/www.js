"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
debug("P3:server");
const http = require("http");
class server {
    constructor(app, port) {
        this.port = 3000;
        this.normalizePort = (val) => {
            let port = parseInt(val, 10);
            if (isNaN(port)) {
                // named pipe
                return val;
            }
            if (port >= 0) {
                // port number
                return port;
            }
            return false;
        };
        this.onError = (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            let bind = typeof this.port === 'string'
                ? 'Pipe ' + this.port
                : 'Port ' + this.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        };
        this.onListening = () => {
            let addr = this.server.address();
            let bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        };
        this.port = port;
        this.server = http.createServer(app);
        this.server.listen(port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
        return this.server;
    }
}
const app_1 = require("../app");
let app = new app_1.main();
app.ready().then((res) => {
    new server(res, 4000);
});
