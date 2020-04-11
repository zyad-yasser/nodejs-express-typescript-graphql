import * as fs from 'fs';

export class FilesHelper {
  constructor() {}

  public readFile = (filePath: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      return fs.readFile(filePath.toString(), (err, xml) => {
        if (err) {
          return reject(err);
        }
        return resolve(xml);
      });
    });
  }
}
