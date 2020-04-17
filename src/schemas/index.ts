import { buildSchema } from 'graphql';

import * as authSchema from './auth.schema';
import * as courseSchema from './course.schema';
import * as lessonSchema from './lesson.schema';
import * as userSchema from './user.schema';
import * as fileSchema from './file.schema';

export const schema: any = buildSchema(
  `
    schema {
      query: RootQuery
      mutation: RootMutation
    }

    type RootQuery {
      ${courseSchema.queries}
      ${authSchema.queries}
      ${lessonSchema.queries}
      ${userSchema.queries}
      ${fileSchema.queries}
    }

    type RootMutation {
      ${authSchema.mutations}
      ${courseSchema.mutations}
      ${lessonSchema.mutations}
      ${userSchema.mutations}
      ${fileSchema.mutations}
    }

    ${authSchema.types}
    ${courseSchema.types}
    ${lessonSchema.types}
    ${userSchema.types}
    ${fileSchema.types}
  `);
