import { validate } from '../middlewares';
import { IFile } from '../types';
import { paginationSchema } from '../validation/common.validation';
import { filesByCourseSchema } from '../validation/file.validation';
import { FileService } from '../services';
const fileService: FileService = new FileService();

const createFilter = async (args, context): Promise<IFile[]> => {
  try {
    await validate(args, paginationSchema);
    const filesData = await fileService.all(args);
    return filesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const listFilters = async (args, context): Promise<IFile[]> => {
  try {
    await validate(args, filesByCourseSchema);
    const filesData = await fileService.getByCourse(args);
    return filesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const filterResolver = {
  listFilters,
  createFilter,
};
