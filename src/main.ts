/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { forwardRoute } from './app/forward-route';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (_, res) => {
  res.send({ message: 'Welcome to api-forward!', version: "0.3.0" });
});

app.all('/forward', forwardRoute);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/forward`);
});
server.on('error', console.error);
