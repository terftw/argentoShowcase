import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { resolvers } from './resolvers';
import ServerApp, { ServerAppContext } from './ServerApp';
import { getCookie } from './request.utils';

const typeDefs = readFileSync(`${__dirname}/schema.graphql`, { encoding: 'utf-8' });

export interface ApolloContext {
    serverAppContext: ServerAppContext
}

const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
});

function getExpressMiddleware(server: ApolloServer<ApolloContext>) {
    return expressMiddleware(server, {
        context: async ({ req }) => {
            return {
                serverAppContext: await ServerApp.getContextFromRequest({
                    getCookie: (name) => getCookie(req, name)
                })
            }
        }
    });
}

export { server, getExpressMiddleware };