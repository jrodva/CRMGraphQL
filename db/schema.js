const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID
    name: String
    surname: String
    email: String
    createdAt: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createdAt: String
  }

  type Token {
    token: String
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Query {
    getUser(id: ID!): User
    getProduct(id: ID!): Product
    getProducts: [Product]
  }

  type Mutation {
    newUser(input: UserInput): User
    authenticateUser(input: AuthenticateInput): Token
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
