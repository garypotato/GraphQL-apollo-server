import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation/index';
import { decodeToken } from './service/utils';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || '';

      if (token) {
        const user = decodeToken(token);

        return { user };
      }
    },
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
