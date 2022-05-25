const { Schema } = require('mongoose');

const categorySchema = new Schema({
    name: [
        {
            type: String,
        },
    ]
});

module.exports = categorySchema;