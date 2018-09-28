import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler = require("errorhandler");
import Express from "Express";
import methodOverride = require("method-override");
import logger from "morgan";
import IndexRoute from "../Routes/IndexRoute";
import ProxyRoute from "../Routes/ProxyRoute";

/**
 * A container for the express logic.
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
    const isDevelopment = process.env.NODE_ENV;
    // get environment variables into node process
    dotenv.config();
    // use logger middlware
    if (isDevelopment) { this.app.use(logger("dev")); }

    // use json form parser middleware
    this.app.use(bodyParser.json());
    this.app.set("json spaces", isDevelopment ? 4 : 0);

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // use cookie parser middleware
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    // whitelist domains from env file
    if (process.env.CORS_ENABLED) {
      const whitelist = process.env.WHITELIST.split(",");
      const corsOpts = {
        origin: (origin: any, callback: (err: Error | any, arg2?: any) => void) => {
          console.log(origin); // tslint:disable-line no-console
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
      };
      this.app.use(cors(corsOpts));
    }

    // use override middlware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        err.status = 404;
        next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  private routes() {
    let router: Express.Router;

    router = Express.Router();
    // IndexRoute
    IndexRoute.create(router);

    // ProxyRoute
    ProxyRoute.create(router);

    // use router middleware
    this.app.use(router);
  }
}
