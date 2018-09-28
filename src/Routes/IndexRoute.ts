import { NextFunction, Request, Response, Router } from "express";
export default class IndexRoute {
  public static create(router: Router) {

    // add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  private index(req: Request, res: Response, next: NextFunction) {
    // render json string
    res.json({
      name: "api-forward",
      version: "0.2.0",
    });
  }
}
