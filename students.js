const mongoose = require('mongoose');

const myschema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },

  email: {
    type: String,
  },
});

module.exports = mongoose.model('details', myschema);
