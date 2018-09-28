import http from "http";
import { HttpServerConfiguration } from "../types/HttpServerConfiguration";

/** Collection of help functions to start a Node.js http server. */
export default class HttpHelper {

  /**
   * Normalize a port into a number, string, or false.
   * @param val {string} The port string to normalize.
   * @param defaultPort {number} The default port number to fall back to.
   * @returns normalizedPort {number} The port number to pass to express.js.
   */
  public static normalizePort(val: string, defaultPort: number): string|number {
    const port = parseInt(val, 0);

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
   * A function to create and start a Node.js http server.
   * @param config {HttpServerConfiguration} An object containing an app, a port, and onError and onListening handlers.
   * @returns httpServer {http.Server} A configured server object.
   */
  public static createServer(config: HttpServerConfiguration, start: boolean): http.Server {
    // Initialize app
    const httpServer = http.createServer(config.app);
    const address = httpServer.address();
    const httpPort = config.httpPort;
    const debug = config.debugFunc;

    // add error handler
    httpServer.on("error", (error: any) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges"); // tslint:disable-line no-console
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use"); // tslint:disable-line no-console
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    // start listening on port
    httpServer.on("listening", () => {
      const addr = httpServer.address();
      const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
      debug(`Listening on ${bind}.`);
    });

    // listen on provided ports
    if (start) {
      console.log("Server starting"); // tslint:disable-line no-console
      httpServer.listen(config.httpPort);
    }

    return httpServer;
  }
}
