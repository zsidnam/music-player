import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/schemas';
import { resolvers } from '../../graphql/resolvers';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        accessToken: req.headers.authorization,
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
