import * as mongoose from 'mongoose';
import { config } from '../config';
import { LoggerService } from '.';

const { name, user, pass } = config.db;

let mongodbOptions: mongoose.ConnectionOptions = {
  dbName: name,
  useNewUrlParser: true,
  useCreateIndex: true,
  socketTimeoutMS: 30000,
  useUnifiedTopology: true,
  keepAlive: true,
};

const mongodbURI = config.mongodbURI;

if (name && user && pass) {
  mongodbOptions = { ...mongodbOptions, user, pass, dbName: name };
}

export class DatabaseService {
  private loggerService: LoggerService = new LoggerService();
  private retries = 0;
  protected db;

  private success(): void {
    return this.loggerService.log([
      {
        string: 'MongoDB:',
        color: 'grey',
      },
      {
        string: 'Connected',
        backgroundColor: 'bgGreenBright',
        color: 'black',
      },
    ]);
  }

  private failed(): void {
    return this.loggerService.log([
      {
        string: 'MongoDB:',
        color: 'grey',
      },
      {
        string: 'Error',
        backgroundColor: 'bgRedBright',
        color: 'black',
      },
    ]);
  }

  private connection = async(): Promise<void> => {
    this.retries += 1;
    if (!this.db) {
      try {
        this.db = await mongoose
          .connect(
            mongodbURI,
            mongodbOptions,
          );
        this.success();
      } catch {
        this.failed();
        setTimeout(
          () => {
            if (this.retries < 5) {
              this.connection();
            }
          },
          200,
        );
      }
    }
  }

  public dbInstance = () => {
    return this.db;
  }

  constructor() {
    this.connection();
  }
}
