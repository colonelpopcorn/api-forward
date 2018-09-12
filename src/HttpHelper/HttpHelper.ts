import { Listeners } from 'types/Listeners';
import http from 'http';

export default class HttpHelper {

   /**
   * Normalize a port into a number, string, or false.
   * @param val {string} The port string to normalize.
   * @param defaultPort {number} The default port number to fall back to.
   * @returns normalizedPort {number} The port number to pass to express.js.
   */
  public static normalizePort(val : string, defaultPort : number) : string|number {
    let port = parseInt(val, 0);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return defaultPort;
  }

/**
 * Get event listeners for the http server.
 * @returns Object containing event listener functions.
 */
  public static getEventListeners() : Listeners {
    return {
      /**
       * Event listener for HTTP server "error" event.
       */
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

  public static createServer(config: any) : http.Server {
    // Initialize app
    let httpServer = http.createServer(config.app);

    // listen on provided ports
    httpServer.listen(config.httpPort);

    // add error handler
    httpServer.on("error", config.onError);

    // start listening on port
    httpServer.on("listening", config.onListening);

    return httpServer;
  }
}
