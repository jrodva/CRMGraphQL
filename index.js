const { ApolloServer, gql } = require('apollo-server');

const COURSES = [
  { title: 'Advanced Java', technology: 'Java' },
  { title: 'Advanced JavaScript', technology: 'JavaScript' }
];

const typeDefs = gql`
  type Course {
    title: String
  }
  type Technology {
    technology: String
  }
  type Query {
    getCourses: [Course]
    getTechnologies: [Technology]
  }
`;
const resolvers = {
  Query: {
    getCourses: () => COURSES,
    getTechnologies: () => COURSES
  }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url }) => console.log(`Server ready at url ${url}`));
