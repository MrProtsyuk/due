const mongoose = require('mongoose');
const { Schema } = mongoose;

const expensesSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    link: {
        type: String,
    },
    category: {
        type: String
    },
    recurring: {
        type: String,
        reqired: true
    }
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;