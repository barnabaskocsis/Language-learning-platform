import express from 'express';
import { mikroorm } from './entities';
import ormConfig from './mikro-orm.config';
import { routes } from './controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(bodyParser.json());

//database
app.use(mikroorm(ormConfig));

//endpoints
app.use(routes);
