export default class Server {

  readonly PortNumber : number
  private _defaultPort: number
  get defaultPort() : number {
    return this._defaultPort;
  }
  set defaultPort(newPort: number) {
    this._defaultPort = newPort;
  }

  constructor(portNumber: string, defaultPort: number) {
    this.defaultPort = 8080; // Port defaults to 8080.
    this.PortNumber = this.normalizePort(portNumber, this.defaultPort);

  }
   /**
   * Normalize a port into a number, string, or false.
   * @param val {string} The port string to normalize.
   * @param defaultPort {number} The default port number to fall back to.
   * @returns normalizedPort {number} The port number to pass to express.js.
   */
  public normalizePort(val : string, defaultPort : number) : number {
    let port = parseInt(val, 0);

    if (isNaN(port)) {
      // named pipe
      return port;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return defaultPort;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  public static getEventListeners() : object {
    return {
      onError(error : any, httpPort : number) {
        if (error.syscall !== "listen") {
          throw error;
        }

        var bind = typeof httpPort === "string"
          ? "Pipe " + httpPort
          : "Port " + httpPort;

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
          case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
          default:
            throw error;
        }
      },

      /**
       * Event listener for HTTP server "listening" event.
       */
      onListening(httpServer : any, debug : Function) {
        var addr = httpServer.address();
        var bind = typeof addr === "string"
          ? "pipe " + addr
          : "port " + addr.port;
        debug("Listening on " + bind);
      }
    }
  }
}
