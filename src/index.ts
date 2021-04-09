import express, { json, urlencoded, Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import * as routers from './Routers';

const app: Application = express();
const port = process.env.PORT || 9999;

app.use(cors({}));
app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));

if (!!routers) {
  let entries = Object.entries(routers);
  for (let entry of entries) {
    let [routeName, routeFunction] = entry;
    app.use(`/${routeName.toString()}`, routeFunction);
  }
}

app.listen(port, () => console.log(`Listening on port ${port}`));
