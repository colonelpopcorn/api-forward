import { NextFunction, Request, Response, Router } from "express";

export default class ProxyRoute {

  public static create(router: Router) {
    router.get("/:appName", (req: Request, res: Response, next: NextFunction) => {
      new ProxyRoute().index(req, res, next);
    });
  }

  private async index(req: Request, res: Response, next: NextFunction) {
    const appName: string = req.params.appName;
    // Extract the particulars from the env file.
    const envForApp: object = this.getEnvForApp(appName);

    // Proxy the request.
    res.json({
      data: envForApp,
    });
  }

  private getEnvForApp(appName: string): object {
    const envStrsForApp = process.env[appName].split(",");
    const envForApp: any = {};
    // console.dir(process.env); // tslint:disable-line no-console
    envStrsForApp.forEach((value) => {
      const processEnvKey = process.env[value + "_KEY"] ;
      const processEnvVal = process.env[value + "_VALUE"];
      // const processEnvOpts = process.env[value + "_OPTS"]; // contemplating this one
      envForApp[processEnvKey] = processEnvVal;
    });
    return envForApp;
  }

}
