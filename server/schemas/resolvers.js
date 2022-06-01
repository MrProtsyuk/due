const { AuthenticationError } = require('apollo-server-express')
const { User, Expenses } = require('../models/index')
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          // .populate('thoughts')
          // .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    expenses: async (parent, { description, date, amount }) => {
      const params = {};

      if (date) {
        params.date = date
      }

      if (amount) {
        params.amount = amount
      }

      if (description) {
        params.description = description
      }

      return await Expenses.find(params)
    },
    expense: async (parent, { _id }) => {
      return await Expenses.findById(_id)
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('expenses')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('expenses')
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addExpense: async (parent, args, context) => {
      if (context.user) {
        const expense = await Expenses.create({ ...args, userId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { userExpenses: expense._id } },
          { new: true }
        )
        return expense;
      }

      throw new AuthenticationError('You need to be logged in!')
    }

  }
}

module.exports = resolvers;