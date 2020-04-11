import { LogObject } from '../types/logObject';
import { config } from '../config';

export class LoggerService {
  private isDevelopment: boolean = config.isDevelopment;

  private isPhrase = (toLog: LogObject | LogObject[]) => {
    return Array.isArray(toLog);
  }

  private colorize = (toLog: LogObject | LogObject[]) => {
    const _toLog = this.isPhrase(toLog)
      ? toLog
      : [toLog];
    // @ts-ignore
    return this.colorizePhrase(_toLog);
  }

  private colorizePhrase = (toLog: LogObject[]) : string[] => {
    const items = [];
    toLog.forEach(
      (toLog: LogObject) => items.push(
        this.colorizeOne(toLog),
      ),
    );
    return items;
  }

  private colorizeOne(toLog: LogObject) {
    const { backgroundColor, string, color } = toLog;
    try {
      if (!this.isDevelopment) {
        throw Error('Not development mode');
      }
      const colors = require('cli-color');
      let colorObj = colors;
      if (backgroundColor && colorObj[backgroundColor]) {
        colorObj = colorObj[backgroundColor];
      }
      if (color && colorObj[color]) {
        colorObj = colorObj[color];
      }
      return colorObj(` ${string} `);
    } catch (err) {
      return ` ${string} `;
    }
  }

  public log(toLog: LogObject | LogObject[]): void {
    console.log(
      ...this.colorize(toLog),
    );
  }

  constructor() {}
}
