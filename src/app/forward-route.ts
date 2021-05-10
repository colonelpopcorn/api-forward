import { Request, Response } from 'express';
import { AxiosRequestConfig, default as axios, Method } from 'axios';

export const forwardRoute = (
  req: Request,
  res: Response
) => {
  let initialConf: AxiosRequestConfig = {};
  if (req.method === 'GET') {
      initialConf = {
          params: { ...req.query },
          url: req.query.url as string,
      };
      delete initialConf.params.url;
  } else {
      initialConf = req.body;
  }
  const requestConfig: AxiosRequestConfig = lookupConfig({ ...initialConf, method: req.method as Method });
  try {
    axios(requestConfig).then(({ data }) => res.json(data));
  } catch (err) {
    console.error(err);
    res.json({err});
  }
};

const lookupConfig = (requestConf: AxiosRequestConfig): AxiosRequestConfig => {
    const newRequestConf = { ...requestConf };
    if (requestConf.method === 'GET') {
        for (const [key, val] of Object.entries(requestConf.params)) {
            if ((val as string).includes("_LOOKUP_")) {
                newRequestConf.params[key] = lookupInEnv(val as string);
            }
        }
    } else {
        for (const [key, val] of Object.entries(requestConf.data)) {
            if ((val as string).includes("_LOOKUP_")) {
                newRequestConf.data[key] = lookupInEnv(val as string)
            }
        }
    }
    return newRequestConf;
}

const lookupInEnv = (valueToReplace: string): any => {
    if (valueToReplace.includes("_JSON")) {
        return JSON.parse(process.env[valueToReplace]);
    } else if (valueToReplace.includes("_EVAL")) {
        return eval(process.env[valueToReplace]);
    } else {
        return process.env[valueToReplace];
    }
};