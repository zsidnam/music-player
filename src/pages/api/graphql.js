import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        spotifyToken: req.headers.authorization,
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
