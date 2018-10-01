import axios, { AxiosRequestConfig } from "axios";
import { NextFunction, Request, Response, Router } from "express";
import http from "http";
import https from "https";

export default class ProxyRoute {

  public static create(router: Router) {
    const proxyRoute = new ProxyRoute();
    router.post("/request", (req: Request, res: Response, next: NextFunction) => {
      try {
        proxyRoute.customRequest(req, res, next);
      } catch (err) {
        next(err);
      }
    });
    router.all("/request/:appName", (req: Request, res: Response, next: NextFunction) => {
      try {
        proxyRoute.index(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  }

  private static readonly RootAxiosConfig: AxiosRequestConfig = {
    baseURL: "",
    headers: {},
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 2000,
    maxRedirects: 5,
    method: "GET",
    params: {},
    proxy: false,
    responseType: "json",
    timeout: 10000,
    transformResponse: [],
    url: "",
    validateStatus: (status) => {
      return status >= 200 && status < 400;
    },
    withCredentials: false,
  };

  private async index(req: Request, res: Response, next: NextFunction) {
    const appName: string = req.params.appName;

    // Extract the particulars from the env file.
    const envForApp: object = this.getEnvForApp(appName);
    let remoteRes = {};

    try {
      // Proxy the request.
      remoteRes = await this.getResponse(req, envForApp);
      res.json(remoteRes);
    } catch (err) {
      next(err);
    }
  }

  private async customRequest(req: Request, res: Response, next: NextFunction) {
    let remoteRes = {};

    try {
      remoteRes = await this.getResponse(req, req.params);
      res.json(remoteRes);
    } catch (err) {
      next(err);
    }
  }

  private async getResponse(req: Request, envForApp: any): Promise<any> {
    const routeConf: AxiosRequestConfig = {method: req.method, data: {}};

    // If we post a whole axios config we can just make a custom request.
    const reqConfig = Object.assign(ProxyRoute.RootAxiosConfig, routeConf, envForApp);
    let remoteRes: any = {};
    try {
      remoteRes = await axios(reqConfig);
    } catch (err) {
      throw err.message;
    }
    return remoteRes[envForApp.rootProp];
  }

  private getEnvForApp(appName: string): any {
    const envStrsForApp = process.env[appName].split(",");
    const envForApp: any = Object.assign(ProxyRoute.RootAxiosConfig, {
      rootProp: process.env[appName + "_ROOT_PROP"],
      url: process.env[appName + "_URL"],
    });
    // console.dir(process.env); // tslint:disable-line no-console
    envStrsForApp.forEach((envStr) => {
      const processEnvKey = process.env[envStr + "_KEY"] ;
      const processEnvVal = process.env[envStr + "_VALUE"];
      const processEnvOpts = process.env[envStr + "_OPTS"]; // contemplating this one
      if (processEnvOpts.includes("isHeader")) {
        envForApp.headers[processEnvKey] = processEnvVal;
      } else if (processEnvOpts.includes("isRequestProp")) {
        envForApp.data[processEnvKey] = processEnvVal;
      } else if (processEnvOpts.includes("isQueryStr")) {
        envForApp.params[processEnvKey] = processEnvVal;
      }
    });
    return envForApp;
  }

}
