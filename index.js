const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connectDataBase = require('./config/db');
const server = new ApolloServer({
  typeDefs,
  resolvers
});

connectDataBase()
  .then(
    () => {
      server
        .listen()
        .then(({ url }) => console.log(`Server ready at url ${url}`))
    }
  )
  .catch(
    (error) => console.log(`Failed connection for ${error}`)
  );
