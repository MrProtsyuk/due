const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    userExpenses: [Expenses]
  }

  type Expenses {
    _id: ID
    description: String
    date: String
    amount: Int
    link: String
    category: String
    recurring: String
    paid: Boolean
  }

  type Query {
    _id: ID
    me: User
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
    addExpense(description: String!, category: String, amount: Int!, link: String, date: String!, recurring: String!, paid: Boolean): User
    editExpense(_id: ID!, description: String, date: String, amount: Int, link: String, category: String, recurring: String, paid: Boolean): Expenses
    removeExpense(_id: ID!): User
  }
`;

module.exports = typeDefs;