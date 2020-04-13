import { coursesResolver } from './courses.resolver';
import { authResolver } from './auth.resolver';

export const rootValue: any = {
  ...authResolver,
  ...coursesResolver,
};
