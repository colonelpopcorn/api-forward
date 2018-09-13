import { Listeners } from 'types/Listeners';
import http from 'http';
import { HttpServerConfiguration } from 'types/HttpServerConfiguration';

/** Collection of help functions to start a Node.js http server. */
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

  /**
   * A function to create and start a Node.js http server.
   * @param config {HttpServerConfiguration} An object containing an app, a port, and onError and onListening handlers.
   * @returns httpServer {http.Server} A configured server object.
   */
  public static createServer(config: HttpServerConfiguration) : http.Server {
    // Initialize app
    let httpServer = http.createServer(config.app);

    // listen on provided ports
    httpServer.listen(config.httpPort);

    // add error handler
    httpServer.on("error", config.listeners.onError);

    // start listening on port
    httpServer.on("listening", config.listeners.onListening);

    return httpServer;
  }
}
