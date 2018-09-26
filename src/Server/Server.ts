import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler = require("errorhandler");
import Express from "Express";
import methodOverride = require("method-override");
import logger from "morgan";
import * as path from "path";

/**
 * The server.
 *
 * @class Server
 */
export default class Server {

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  public app: Express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create Expressjs application
    this.app = Express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // get environment variables into node process
    dotenv.config();
    // use logger middlware
    this.app.use(logger("dev"));

    // use json form parser middleware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // use cookie parser middleware
    this.app.use(cookieParser(process.env.COOKIE_SECRET));

    // use override middlware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        err.status = 404;
        next(err);
    });
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes() {
    // empty for now
  }
}
