import { buildSchema } from 'graphql';

import * as authSchema from './auth.schema';
import * as coursesSchema from './courses.schema';

export const schema: any = buildSchema(
  `
    schema {
      query: RootQuery
      mutation: RootMutation
    }

    type RootQuery {
      ${coursesSchema.queries}
      ${authSchema.queries}
    }

    type RootMutation {
      ${authSchema.mutations}
      ${coursesSchema.mutations}
    }

    ${authSchema.types}
    ${coursesSchema.types}
  `);
