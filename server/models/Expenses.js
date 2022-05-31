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
    category: {
        type: String
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
    date: {
        type: Date,
        required: true,
    },
    recurring: {
        type: String,
        required: true
    }
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;