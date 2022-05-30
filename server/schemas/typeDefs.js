const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    email: String
    userCategory: [Category]
    userExpenses: [Expenses]
  }

  type Expenses {
    _id: ID
    description: String
    date: String
    amount: Int
    link: String
    category: Category
  }

  type Query {
    me: User
    categories (name: String!): [Category]
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
    addExpense(description: String!, amount: Int!, link: String!): User
    addCategory(name: String!): User
  }
`;

module.exports = typeDefs;