const { AuthenticationError } = require('apollo-server-express')
const { User, Expenses } = require('../models/index')
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

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
    expenses: async (parent, args, context) => {
      if(context.user){
        return await Expenses.find({ userId: new mongoose.Types.ObjectId(context.user._id) })
      }
    },
    expense: async (parent, { _id }) => {
      return await Expenses.findById(_id)
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('expenses')
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
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
    },
    removeExpense: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedExpenses = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { userExpenses: { _id } } },
          { new: true }
        );

        return updatedExpenses
      }
      
      throw new AuthenticationError('You need to be logged in!')
    },
    editExpense: async (parent, { _id, userExpenses } ) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { userExpenses },
          { new: true }
        )
      }
    }

  }
}

module.exports = resolvers;