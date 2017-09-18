import * as debug from "debug";
debug("P3:server")
import * as http from "http";
export class server{
  private server;
  private port = 3000;

  constructor(app,port:number){
    this.port = port;
    this.server = http.createServer(app);
    this.server.listen(port)
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
    return this.server;
  }

  private normalizePort = (val:string) => {
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
  }

  private onError = ( error ) => {
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
  }

  onListening = () => {
    let addr = this.server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}
