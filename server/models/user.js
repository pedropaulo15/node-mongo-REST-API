const mongoose = require('mongoose');

// Defining a User model
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  User
}