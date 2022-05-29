const { Schema } = require('mongoose');

const expensesSchema = new Schema ({

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
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});


module.exports = expensesSchema;