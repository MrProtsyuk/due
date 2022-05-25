const { Schema } = require('mongoose');

const expensesSchema = new Schema ({

    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
    }
})

const Expenses = model('Expenses', expensesSchema);

module.exports = Expenses;