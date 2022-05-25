const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    expenses: [Expenses]
  }

  type Expenses {
    _id: ID
    description: String
    date: String
    amount: Int
    link: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    expenses(username: String): [Expenses]
    expense(_id: ID!): Expenses
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addExpense(description: String!, amount: Int!, link: String)
  }
`;

module.exports = typeDefs;