/*import { NextFunction, Request, Response, Router } from "express";

import * as util from 'util';
import * as axios from 'axios';

export default class Middleware {
  public addHeaders(req: Request, res: Response, next: NextFunction) {
    let appName = req.params.appName
    let preSplitListOfReqVars = process.env[appName]
    let listOfReqVars : string[]

    if (preSplitListOfReqVars !== null) {
      listOfReqVars = preSplitListOfReqVars.split(',')
    }

    req.container = {}
    req.container.headers = {}

    for (let variable of listOfReqVars) {
      req.container.headers[`${process.env[variable + '_KEY']}`] = process.env[`${variable}_VALUE`]
    }

    req.apiUrl = process.env[`${req.params.appName}_URL`] || decodeURI(JSON.parse(req.body.apiUrl)) || false

    if (req.container.headers['']) {
      res.json({
        status: 'failed',
        response: `Key-value pair not found in env for ${req.params.appName}`
      })
      return
    }

    if (!req.apiUrl) {
      res.json({
        status: 'failed',
        response: `API url not found for ${req.params.appName}`
      })
      return
    }

    req.propToReturn = process.env[`${req.params.appName}_PROP_TO_RETURN`] || req.body.propToReturn || false

    if (!req.propToReturn) {
      res.json({
        status: 'failed',
        response: `Property to return not found in env or body for ${req.params.appName}`
      })
      return
    }

    delete req.body.propToReturn
    delete req.body.apiUrl

    next()
  }

  public getResponse(req: Request, res: Response, next: NextFunction) {
    //console.log(req.apiUrl)
    let reqConfig = {
      url: req.apiUrl,
      headers: req.container.headers,
      params: req.body,
    }
    axios(reqConfig)
      .then(data => {
        res.json(data[req.propToReturn])
        return
      })
      .catch(error => {
        res.send({
          status: 'failed',
          response: `API request failed: ${error.message}`
        })
        return
      })
    return
  }

}
*/
