import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import { ServerResponse } from 'http';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { applyMiddleware } from 'graphql-middleware';
import { log } from '../../utils/api/log';
import { permissions } from '../../utils/api/permissions';
import { context } from '../../utils/api/context';

const cors = Cors();
export const config = { api: { bodyParser: false } };

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers })
  //  log,
  //  permissions
);

const apolloServer = new ApolloServer({ schema, context });
const startServer = apolloServer.start();

export default async function handler(request: MicroRequest, response: ServerResponse) {
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-requestuested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers'
  );
  response.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
  );
  if (request.method === 'OPTIONS') {
    response.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(request, response);
}
