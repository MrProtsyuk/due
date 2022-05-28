const { Schema } = require('mongoose');

const categorySchema = new Schema ({
    name: {
      type: String,
      trim: true
    }
});

module.exports = categorySchema;
