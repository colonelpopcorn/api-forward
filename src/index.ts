#!/usr/bin/env node
"use strict";

// module dependencies
import HttpHelper from "./HttpHelper/HttpHelper";
import Server from "./Server/Server";
// create http server

const app = Server.bootstrap().app;
const httpPort = HttpHelper.normalizePort(process.env.PORT, 8080);
app.set("port", httpPort);
const httpServer = HttpHelper.createServer({
  app,
  debugFunc: (str: string) => { console.log(str); }, // tslint:disable-line no-console
  httpPort,
}, true);
