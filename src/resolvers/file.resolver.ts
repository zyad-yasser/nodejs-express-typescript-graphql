import { validate } from '../middlewares';
import { IFile } from '../types';
import { paginationSchema } from '../validation/common.validation';
import { filesByCourseSchema, addFileToCourseSchema } from '../validation/file.validation';
import { FileService } from '../services';
const fileService: FileService = new FileService();

const files = async (args, context): Promise<IFile[]> => {
  try {
    await validate(args, paginationSchema);
    const filesData = await fileService.all(args);
    return filesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const filesByCourse = async ({ input }, context): Promise<IFile[]> => {
  try {
    await validate(input, filesByCourseSchema);
    const filesData = await fileService.getByCourse(input);
    return filesData;
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const addFileToCourse = async ({ input }, context): Promise<IFile> => {
  try {
    await validate(input, addFileToCourseSchema);
    const fileData = await fileService.addToCourse(input);
    return fileData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const fileResolver = {
  addFileToCourse,
  filesByCourse,
  files,
};
