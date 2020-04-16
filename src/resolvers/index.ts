import { courseResolver } from './course.resolver';
import { lessonResolver } from './lesson.resolver';
import { fileResolver } from './file.resolver';
import { authResolver } from './auth.resolver';
import { filterResolver } from './filter.resolver';

export const rootValue: any = {
  ...authResolver,
  ...courseResolver,
  ...lessonResolver,
  ...fileResolver,
  ...filterResolver,
};
