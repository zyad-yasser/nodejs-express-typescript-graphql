import * as dotenv from 'dotenv';
dotenv.config();
import * as debug from 'debug';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { config } from './config';
import { LoggerService } from './services';
const app = require('./app');

export class Server {
  private port: any = config.server.port;
  private loggerService: LoggerService = new LoggerService();
  private serverType: string;
  private server;

  constructor() {
    debug('app:server');
    this.init();
  }

  private onListening = (): void => {
    this.loggerService.log({
      string: config.appName,
      backgroundColor: 'bgBlueBright',
      color: 'black',
    });

    this.loggerService.log([
      {
        string: 'Listening on',
        color: 'grey',
      },
      {
        string: this.port,
        backgroundColor: 'bgGreenBright',
        color: 'black',
      },
    ]);

    this.loggerService.log([
      {
        string: 'Server type : ',
        color: 'grey',
      },
      {
        string: this.serverType,
        backgroundColor: 'bgGreenBright',
        color: 'black',
      },
    ]);
  }

  private onError = (error: NodeJS.ErrnoException): void => console.log(error);

  private createHttpServer(): void {
    this.server = http.createServer(app);
    this.serverType = 'HTTP';
  }

  private createHttpsServer(): void {
    const key = fs.readFileSync(process.env.KEY_PATH);
    const cert = fs.readFileSync(process.env.CERT_PATH);
    this.server = https.createServer({ key, cert }, app);
    this.serverType = 'HTTPS';
  }

  private init = () => {
    const { certPath, keyPath } = config.server;
    if (certPath && keyPath) {
      try {
        this.createHttpsServer();
      } catch (error) {
        this.createHttpServer();
      }
    } else {
      this.createHttpServer();
    }

    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }
}
