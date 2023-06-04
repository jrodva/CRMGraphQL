const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDataBase = require('./config/db');
connectDataBase();

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.listen().then(({ url }) => console.log(`Server ready at url ${url}`));
