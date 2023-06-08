const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connectDataBase = require('./config/db');
const jwt = require("jsonwebtoken");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';

    if (!token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);

        console.log(`user ${user}`);

        return user;
      } catch (error) {
        console.log(`Error extracting user :  ${error}`);
      }
    }
  }
});

try {
  await connectDataBase();
  const { url } = await server.listen()

  console.log(`Server ready at url ${url}`)
} catch (error) {
  console.log(`Failed connection for ${error}`);
}
