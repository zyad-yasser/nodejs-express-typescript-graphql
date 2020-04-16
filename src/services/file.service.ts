import { FileRepository } from '../repositories';
import { IFile, IPaginationParams } from '../types';
import { File } from '../models';

export class FileService {
  private fileRepository: FileRepository = new FileRepository();

  public getByCourse = async(args: any): Promise<IFile[]> => {
    const { course, skip, limit } = args;
    return this.fileRepository.getByCourse(course, skip, limit);
  }

  public all = async(params: IPaginationParams): Promise<IFile[]> => {
    const { skip, limit } = params;
    return this.fileRepository.all(skip, limit);
  }

  public addToCourse = async(args: any): Promise<IFile> => {
    const file: IFile = new File(args);
    return this.fileRepository.addToCourse(file);
  }
}
