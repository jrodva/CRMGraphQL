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

  type Customer {
    id: ID
    name: String!
    surname: String!
    company: String!
    email: String!
    phone: String
    vendor: String
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

  input CustomerInput {
    name: String!
    surname: String!
    company: String!
    email: String!
    phone: String
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Query {
    getUser(token: String!): User
    getProduct(id: ID!): Product
    getProducts: [Product]
    getCustomers: [Customer]
    getCustomersByVendor: [Customer]
    getCustomer(id: ID!): Customer
  }

  type Mutation {
    newUser(input: UserInput): User
    authenticateUser(input: AuthenticateInput): Token
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
    newCustomer(input: CustomerInput): Customer
    updateCustomer(id: ID!, input: CustomerInput): Customer
  }
`;

module.exports = typeDefs;
