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

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    customer: Customer
    vendor: ID
    state: OrderState
    createdAt: String
  }

  type OrderGroup {
    id: ID
    quantity: Int
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

  input OrderProductInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float!
    customer: ID!
    state: OrderState
  }

  enum OrderState {
    PENDING,
    COMPLETED,
    CANCELED
  }

  type Query {
    getUser(token: String!): User
    getProduct(id: ID!): Product
    getProducts: [Product]
    getCustomers: [Customer]
    getCustomersByVendor: [Customer]
    getCustomer(id: ID!): Customer
    getOrders: [Order]
    getOrdersByVendor: [Order]
    getOrder(id: ID!): Order
  }

  type Mutation {
    newUser(input: UserInput): User
    authenticateUser(input: AuthenticateInput): Token
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
    newCustomer(input: CustomerInput): Customer
    updateCustomer(id: ID!, input: CustomerInput): Customer
    deleteCustomer(id: ID!): String
    newOrder(input: OrderInput): Order
  }
`;

module.exports = typeDefs;
