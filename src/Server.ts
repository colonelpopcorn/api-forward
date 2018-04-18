import * as express from 'express';

export class Server {
  public app: express.Application;

  public static bootstrap(): Server{
    return new Server();
  }

  /**
   *
   */
  constructor() {
    this.app = express();

    this.config();

  }

  public config() {
    // configure express routes and stuff here.
    throw new Error("Method not implemented.");
  }
}
