import * as express_graphql from 'express-graphql';
import { schema } from '../schemas';
import { config } from '../config';
import { rootValue } from '../resolvers';
import { GraphQLError } from 'graphql';
import * as FormatError from 'easygraphql-format-error';
import { errorMessages } from '../config/error-messages';

const isDevelopment: boolean = config.isDevelopment;
const formatError = new FormatError(errorMessages);
const errorName = formatError.errorName;

export const graphql = express_graphql((request: any, response: any) => {
  return {
    schema,
    rootValue,
    graphiql: isDevelopment,
    context: {
      errorName,
      request,
      response,
      auth: request.auth,
    },
    customFormatErrorFn: (error: GraphQLError) => formatError.getError(error),
  };
});
