import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { corsHeader, notFound, graphql, authenticate } from './middlewares';
import { DatabaseService } from './services';

class Server {
  public app: express.Application;
  public db: DatabaseService;

  constructor() {
    this.app = express();
    this.config();
  }

  public config(): void {
    this.db = new DatabaseService();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(corsHeader);
    this.app.use('/graph', authenticate, graphql);
    this.app.use('/*', notFound);
  }
}

const app = new Server().app;
export = app;
