import { IFile } from '../types';
import { File } from '../models';

export class FileRepository {
  public all = async(skip: number, limit: number): Promise<IFile[]> => {
    return File.find()
      .skip(skip)
      .limit(limit);
  }

  public getByCourse = async(course: string, skip: number, limit: number): Promise<IFile[]> => {
    return File.find({ course })
      .skip(skip)
      .limit(limit);
  }

  public addToCourse = async(file: IFile): Promise<IFile> => {
    return file.save();
  }
}
